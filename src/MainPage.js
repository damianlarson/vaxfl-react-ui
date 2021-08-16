import React from 'react';
import PlayerTable from './PlayerTable';
import axios from 'axios';
import './MainPage.css';
import { AppBar, Toolbar, Typography, Select, InputLabel } from '@material-ui/core';

const playerURI = process.env.PLAYER_URI || 'http://localhost:8080/players';

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {playerData: []};
    }

    async componentDidMount() {
        const newData = (await axios.get(playerURI+'/adp/std')).data;
        this.setState({
            playerData: newData
        });
    }
    render() {
        return (
            <div>
                <div style={{marginBottom: 32}}>
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography variant="h6">
                                VaxFL
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                
                <div>
                    <InputLabel id="label">Scoring</InputLabel>
                    <Select native>
                        <option value='std'>Standard</option>
                        <option value='half'>0.5 PPR</option>
                        <option value='full'>PPR</option>
                    </Select>
                </div>
                <div style={{width: '75%', margin: 'auto'}}>
                    <PlayerTable data={this.state.playerData}/>           
                </div>
            </div>
            
        )
    }
}

export default MainPage;