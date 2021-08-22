import React from 'react';
import Selector from './Selector';
import PlayerTable from './PlayerTable';
import { FormLabel } from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme => createStyles({
    collapse: {
        display: 'flex',
        flexDirection: 'row'
    }
})

class PlayersAvailable extends React.Component {
    options = [
        {value: 'std', display: 'Standard'},
        {value: 'half', display: '0.5PPR'},
        {value: 'full', display: 'PPR'}
    ]
    columns = [
        {field: 'name', headerName:"Player Name", flex: 1, headerAlign: 'left', align: 'left',},
        {field: 'player_position', headerName:"Position", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'team', headerName:"Team", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'adp', headerName:"ADP", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'high', headerName:"High", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'low', headerName:"Low", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'bye', headerName:"Bye", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
    ]
    constructor(props) {
        super(props);

        this.handleEvent = this.handleEvent.bind();
        this.state = { isExpanded: true };
    }

    handleEvent = (scoring) => {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
        this.props.handleEvent(scoring);
    }


    render() {
        return (
            <div style={this.props.style}>
                <div style={{width: "95%", margin: "auto"}}>
                        <div style={{display: 'flex', justifyContent:'space-between', marginBottom: 16}}>
                            <FormLabel style={{marginTop: 'auto'}}>Players Available</FormLabel>
                            <Selector handleEvent={this.handleEvent} options={this.options} label='Scoring' defaultSelected='std'/>
                        </div>
                        <PlayerTable 
                            data={this.props.playerData}
                            teams={this.props.teams} 
                            draftPlayer={this.props.draftPlayer}
                            columns={this.columns}
                            indexToAddColumn={0}
                            sortModel={[{'field': 'adp', 'sort': 'asc'}]}
                            onMenuOpen={this.props.onMenuOpen}
                        />           
                    </div>
            </div>
            
            
                
        )
    }
}

export default withStyles(styles)(PlayersAvailable);