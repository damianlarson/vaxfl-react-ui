import React from 'react';
import { FormLabel } from '@material-ui/core';
import Selector from './Selector';
import PlayerTable from './PlayerTable';

class PlayersAvailable extends React.Component {

    constructor(props) {
        super(props);

        this.handleEvent = this.handleEvent.bind();
    }

    handleEvent = (scoring) => {
        console.log(scoring);
        this.props.handleEvent(scoring);
    }

    render() {
        return (
            <div style={{width: "90%", margin: "auto"}}>
                <div style={{display: 'flex', justifyContent:'space-between', marginBottom: 16}}>
                    <FormLabel style={{marginTop: 'auto'}}>Players Available</FormLabel>
                    <Selector handleEvent={this.handleEvent}/>
                </div>
                <PlayerTable data={this.props.playerData}/>           
            </div>  
                
        )
    }
}

export default PlayersAvailable;