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
    }

    async componentDidMount() {
        this.updateData('std');
    }

    updateData = async (scoring) => {
        console.log(scoring);
        const newData =  (await axios.get(playerURI+`/adp/${scoring}`)).data;
        this.setState({
            playerData: newData.map(player => ({...player, drafted_by: null}))
        });
    }

    setTeamCount(count) {
        const teams = this.state.teams;
        if (count > this.state.teams.length) {
            for (let i = this.state.teams.length; i < count; ++i) {
                teams.push({players: []});
            }
        } else {
            teams.length = count;
        }
        
        this.setState({
            teams: teams
        });
    }

    draftPlayer(player, team) {
        const name = player.name;
        const teams = this.state.teams;
        console.log(player);
        const currentTeam = teams.find(team => team.players.findIndex(player => player.name === name) != -1);
        if (currentTeam === undefined) {
            const players = this.state.playerData;
            players.find(player => player.name === name).drafted_by = team;
            teams[team].players.push(player);
            console.log(teams);
            this.setState({
                playerData: players,
                teams: teams
            });
        } else {
            currentTeam.players.filter(player => player.name !== name);
            console.log(teams);
        }

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
                <TeamDisplay teams={this.state.teams} setTeamCount={this.setTeamCount}/>
            </div>

                
    
        )
    }
}

export default MainPage;