import React from 'react';
import { FormLabel, Collapse } from '@material-ui/core';
import Selector from './Selector';
import PlayerTable from './PlayerTable';
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme => createStyles({
    root: {
        position: 'sticky',
        top: '96px'
    },
})

class PlayersAvailable extends React.Component {

    constructor(props) {
        super(props);

        this.handleEvent = this.handleEvent.bind();
        this.state = { isExpanded: true };
    }

    handleEvent = (scoring) => {
        console.log(scoring);
        this.setState({
            isExpanded: !this.state.isExpanded
        })
        this.props.handleEvent(scoring);
    }


    render() {
        return (
            <div className={this.props.classes.root}>
                <Collapse
                in={this.state.isExpanded}
                collapsedSize="350px"
            >
                <div style={{width: "90%", margin: "auto"}}>
                    <div style={{display: 'flex', justifyContent:'space-between', marginBottom: 16}}>
                        <FormLabel style={{marginTop: 'auto'}}>Players Available</FormLabel>
                        <Selector handleEvent={this.handleEvent}/>
                    </div>
                    <PlayerTable data={this.props.playerData}/>           
                </div>  
            </Collapse>
            </div>
            
            
                
        )
    }
}

export default withStyles(styles)(PlayersAvailable);