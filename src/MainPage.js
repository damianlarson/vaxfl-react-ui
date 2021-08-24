import React from 'react';
import Header from './Header';
import clsx from 'clsx';
import PlayersAvailable from './PlayersAvailable';
import TeamDisplay from './TeamDisplay';
import axios from 'axios';
import './MainPage.css';
import DraftOrderDrawer from './DraftOrderDrawer';
import { withStyles, createStyles } from "@material-ui/core/styles";

const playerURI = process.env.REACT_APP_PLAYER_URI || 'http://localhost:8080/players';
const drawerWidth = '25vw';

const styles = theme => createStyles({
    appDefault: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: '100%',
        marginRight: `-${drawerWidth}`
    },
    appWithDrawerOpen: {
        width: `calc(100% - ${drawerWidth})`, 
        flexGrow: 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appWithDrawerAndMenuOpen: {
        marginRight: '-12px'
    },
    drawerWhenOpen: {width: `${drawerWidth}`, flexShrink: 1},
    drawerWhenClosed: {width: 0}
    
});

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        const teams = [];
        for (let i = 0; i < 12; ++i) {
            teams.push({index: i, players: [], name: `Team ${i+1}`});
        }
        this.state = {
            playerData: [], 
            isDrawerOpen: true, 
            teams: teams, 
            draftIndex: 1,
            isMenuOpen: false,
        };
        this.handleEvent = this.updateData.bind(this);
        this.setTeamCount = this.setTeamCount.bind(this);
        this.draftPlayer = this.draftPlayer.bind(this);
        this.renameTeam = this.renameTeam.bind(this);
        this.toggleDrawerOpen = this.toggleDrawerOpen.bind(this);
        this.onMenuOpen = this.onMenuOpen.bind(this);
    }

    async componentDidMount() {
        this.updateData('std');
    }

    updateData = async (scoring) => {
        const playerData = this.state.playerData;
        let scoringData = this.state[scoring];
        if (scoringData == null) {
            scoringData = (await axios.get(playerURI+`/adp/${scoring}`)).data;
        }
        
        console.log(scoringData);
        console.log(playerData);
    
        scoringData.forEach(player => {
            const existingPlayer = playerData.find(player2 => player2.name === player.name);
            if (!existingPlayer) {
                playerData.push({...player, drafted_by: null});
            } else {
                existingPlayer.adp = player.adp;
                existingPlayer.high = player.high;
                existingPlayer.low = player.low;
                existingPlayer.stdev = player.stdev;
            }
        });

        this.setState({
            playerData: playerData,
            [scoring]: scoringData
        });
    }

    setTeamCount(count) {
        const teams = this.state.teams;
        if (count > teams.length) {
            for (let i = teams.length; i < count; ++i) {
                teams.push({index: i, players: [], name: `Team ${i+1}`});
            }
        } else {
            for (let i = count; i < teams.length; i++) {
                const team = teams[i];
                team.players.forEach(player => {
                    player.drafted_by = null;
                });
            }
            teams.length = count;
        }
        
        this.setState({
            teams: teams
        });
    }

    draftPlayer(player, team) {
        const teams = this.state.teams;
        let draftIndex = this.state.draftIndex;

        if (player.drafted_by !== null) {
            teams[player.drafted_by].players = teams[player.drafted_by].players.filter(existingPlayer => existingPlayer.name !== player.name);
        }

        player.drafted_by = team;
        
        if (player.draft_position == null) {
            player.draft_position = draftIndex++;
        }

        player.draft_position_formatted = this.getFormattedDraft(player.draft_position, teams);
        player.drafted_by_formatted = teams[team].name;

        teams[team].players.push(player);
        this.setState({
            teams: teams,
            draftIndex: draftIndex
        });
    }

    getFormattedDraft(draftIndex, teams) {
        let pick = draftIndex % teams.length || teams.length;
        let round = parseInt(draftIndex / teams.length);
        if (pick !== teams.length) {
            round++;
        }
        return `${round}.${pick}`
    }

    renameTeam(teamIndex, teamName) {
        const teams = this.state.teams;
        const players = this.state.playerData;
        players.forEach(player => {
            if (player.drafted_by_formatted === teams[teamIndex].name) {
                player.drafted_by_formatted = teamName
            }
        });
        teams[teamIndex].name = teamName;
        this.setState({
            teams: teams
        });
    }

    toggleDrawerOpen() {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen
        });
    }

    onMenuOpen() {
        if (!this.state.isMenuOpen) {
            this.setState({
                isMenuOpen: true
            });
        }

    }
    render() {
        return (
                <div style={{display: 'flex'}}>
                    <div className={clsx(this.props.classes.appWithDrawerOpen, {[this.props.classes.appWithDrawerAndMenuOpen] : this.state.isMenuOpen && this.state.isDrawerOpen}, {[this.props.classes.appDefault]: !this.state.isDrawerOpen})}>
                        <Header open={this.state.isDrawerOpen} toggleDrawerOpen={this.toggleDrawerOpen}/>
                        <PlayersAvailable 
                            playerData={this.state.playerData.filter(player => player.drafted_by === null)} 
                            handleEvent={this.updateData} 
                            style={{marginBottom: '32px'}}
                            teams={this.state.teams}
                            draftPlayer={this.draftPlayer}
                            onMenuOpen={this.onMenuOpen}
                        />
                        <TeamDisplay teams={this.state.teams} setTeamCount={this.setTeamCount} renameTeam={this.renameTeam} onMenuOpen={this.onMenuOpen} draftPlayer={this.draftPlayer}/>
                    </div>
                    
                    <div>
                        <DraftOrderDrawer 
                            width={drawerWidth} 
                            isDrawerOpen={this.state.isDrawerOpen}
                            isMenuOpen={this.state.isMenuOpen}
                            toggleDrawerOpen={this.toggleDrawerOpen}
                            draftedPlayers={this.state.playerData.filter(player => player.drafted_by != null).sort((v1, v2) => {
                                if (parseInt(v1.draft_position_formatted) !== parseInt(v2.draft_position_formatted)) {
                                    return parseInt(v1.draft_position_formatted) - parseInt(v2.draft_position_formatted)
                                }  else {
                                    return parseInt(v1.draft_position_formatted.split('.')[1] - v2.draft_position_formatted.split('.')[1]);
                                }
                            })}
                        />
                    </div>
                </div>
        )
    }
}

export default withStyles(styles)(MainPage);