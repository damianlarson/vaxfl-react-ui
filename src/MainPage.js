import React from 'react';
import Header from './Header';
import PlayersAvailable from './PlayersAvailable';
import TeamDisplay from './TeamDisplay';
import axios from 'axios';
import './MainPage.css';

const playerURI = process.env.PLAYER_URI || 'http://localhost:8080/players';

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        const teams = [];
        for (let i = 0; i < 12; ++i) {
            teams.push({index: i, players: [], name: `Team ${i+1}`});
        }
        this.state = {playerData: [], open: true, teams: teams};
        this.handleEvent = this.updateData.bind(this);
        this.setTeamCount = this.setTeamCount.bind(this);
        this.draftPlayer = this.draftPlayer.bind(this);
        this.renameTeam = this.renameTeam.bind(this);
    }

    async componentDidMount() {
        this.updateData('std');
    }

    updateData = async (scoring) => {
        const newData =  (await axios.get(playerURI+`/adp/${scoring}`)).data;
        const teams = this.state.teams;
        teams.forEach(team => {
            team.players.length = 0;
        });
        this.setState({
            playerData: newData.map(player => ({...player, drafted_by: null})),
            teams: teams
        });
    }

    setTeamCount(count) {
        const teams = this.state.teams;
        if (count > this.state.teams.length) {
            for (let i = this.state.teams.length; i < count; ++i) {
                teams.push({index: i, players: [], name: `Team ${i+1}`});
            }
        } else {
            for (let i = count; i < this.state.teams.length; i++) {
                const team = this.state.teams[i];
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
        const playerName = player.name;
        const teams = this.state.teams;
        const players = this.state.playerData;
        if (player.drafted_by === null) {
            players.find(player => player.name === playerName).drafted_by = team;
        } else {
            const currentTeam = teams[player.drafted_by];
            currentTeam.players.filter(player => player.name !== playerName);
        }

        teams[team].players.push(player);
        this.setState({
            playerData: players,
            teams: teams
        });        
    }

    renameTeam(teamIndex, teamName) {
        const teams = this.state.teams;
        teams[teamIndex].name = teamName;
        this.setState({
            teams: teams
        });
    }

    render() {
        return (
            <div>
                <Header />
                <PlayersAvailable 
                    playerData={this.state.playerData.filter(player => player.drafted_by === null)} 
                    handleEvent={this.updateData} 
                    style={{marginBottom: '32px'}}
                    teams={this.state.teams}
                    draftPlayer={this.draftPlayer}
                />
                <TeamDisplay teams={this.state.teams} setTeamCount={this.setTeamCount} renameTeam={this.renameTeam}/>
            </div>

                
    
        )
    }
}

export default MainPage;