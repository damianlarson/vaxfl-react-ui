import React from 'react';
import { FormLabel, Collapse, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Selector from './Selector';
import PlayerTable from './PlayerTable';
import { withStyles, createStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
            <div style={this.props.style}>
                <Accordion defaultExpanded={true} TransitionProps={{collapsedSize: '300px'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <FormLabel style={{marginTop: 'auto'}}>Players Available</FormLabel>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{width: "90%", margin: "auto"}}>
                        <div style={{display: 'flex', justifyContent:'flex-end', marginBottom: 16}}>
                            <Selector handleEvent={this.handleEvent} options={this.options} label='Scoring' defaultSelected='std'/>
                        </div>
                        <PlayerTable data={this.props.playerData}/>           
                    </div>
                </AccordionDetails>
                    
                </Accordion>
                
            </div>
            
            
                
        )
    }
}

export default withStyles(styles)(PlayersAvailable);