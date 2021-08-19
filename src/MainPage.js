import React from 'react';
import PlayerTable from './PlayerTable';
import Header from './Header';
import Selector from './Selector';
import axios from 'axios';
import './MainPage.css';

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
        const newData =  (await axios.get(playerURI+`/adp/${scoring}`)).data;
        this.setState({
            playerData: newData
        });
    }
    render() {
        return (
            <div>
                <Header />
                <div style={{width: '75%', margin: 'auto'}}>
                    <Selector style={{display: 'flex', justifyContent:'flex-end', marginBottom: 16}} handleEvent={this.updateData}/>
                    <PlayerTable data={this.state.playerData}/>           
                </div>
            </div>
            
        )
    }
}

export default MainPage;