import React from 'react';
import Header from './Header';
import PlayersAvailable from './PlayersAvailable';
import axios from 'axios';
import './MainPage.css';
import { FormLabel } from '@material-ui/core';

const playerURI = process.env.PLAYER_URI || 'http://localhost:8080/players';

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {playerData: []};
        this.handleEvent = this.updateData.bind(this);
    }

    async componentDidMount() {
        this.updateData('std');
    }

    updateData = async (scoring) => {
        console.log(scoring);
        const newData =  (await axios.get(playerURI+`/adp/${scoring}`)).data;
        this.setState({
            playerData: newData
        });
    }
    render() {
        return (
            <div>
                <Header />
                <PlayersAvailable playerData={this.state.playerData} handleEvent={this.updateData}/>
                <div style={{height: '2000px'}}>text</div>
            </div>

                
    
        )
    }
}

export default MainPage;