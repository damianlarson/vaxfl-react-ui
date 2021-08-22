import React from 'react';
import { Tabs, Tab, Button, Input } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { withStyles, createStyles } from '@material-ui/styles';

const styles = (theme) => createStyles({
    root: {
        flex: 1,
        minWidth: '1px',
        maxWidth: '100%',
        backgroundColor: '#0D47A1',
        color: 'white'
    }
})

class TeamTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            setTeamName: false
        }
        this.setTabValue = this.setTabValue.bind(this);
        this.openRenameTeam = this.openRenameTeam.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.renameTeam = this.renameTeam.bind(this);
    }

    setTabValue(event, value) {
        this.props.setTabValue(value);
    }

    openRenameTeam(button) {
        this.setState({
            setTeamName: true,
            teamNameValue: this.props.teams[this.state.value].name
        });
    }

    handleInput(event) {
        this.setState({
            teamNameValue: event.target.value
        });
    }
    
    renameTeam() {
        this.props.renameTeam(this.state.value, this.state.teamNameValue);
        this.setState({
            setTeamName: false,
            teamNameValue: null
        });
    }
    render() {
        return (
            <TabContext value={this.props.value}>
                <Tabs value={this.props.value} onChange={this.setTabValue}>
                    {this.props.teams.map(team => (
                        <Tab 
                            label={team.name} value={`${team.index}`} 
                            key={team.index} 
                            classes={{ root: this.props.classes.root }}                            
                        />
                    ))}
                </Tabs>
                {this.props.teams.map((team) => (
                    <TabPanel key={team.index+'panel'} value={`${team.index}`}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>                        
                            <Button 
                                variant="contained" 
                                onClick={(button) => this.openRenameTeam(button)}
                                style={{marginRight: '16px'}}
                            >
                                Rename Team
                            </Button>
                            {this.state.setTeamName ? 
                                <form >
                                    <Input defaultValue={team.name} style={{marginRight: '16px'}} onChange={this.handleInput}></Input>
                                    <Button variant="contained" color="primary" onClick={this.renameTeam}>Submit</Button>
                                </form> : null}
                        </div>
                        {team.players.map(player => (
                            <div>{player.name}</div>
                        ))}
                    </TabPanel>
                ))}
            </TabContext>
        )

        
    }
}
export default withStyles(styles)(TeamTabs);