import React from 'react';
import PlayerTable from './PlayerTable';
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
    columns = [
        {field: 'name', headerName:"Player Name", flex: 1, headerAlign: 'left', align: 'left',},
        {field: 'player_position', headerName:"Position", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'team', headerName:"Team", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'draft_position_formatted', headerName:"Draft Position", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left', sortComparator: (v1, v2, param1, param2) => {
            if (parseInt(v1) !== parseInt(v2)) {
                return parseInt(v1) - parseInt(v2)
            }  else {
                return parseInt(v1.split('.')[1] - v2.split('.')[1]);
            }
        }},
        {field: 'bye', headerName:"Bye", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
    ]

    constructor(props) {
        super(props);
        this.state = {
            setTeamName: false
        }
        this.setTabValue = this.setTabValue.bind(this);
        this.openRenameTeam = this.openRenameTeam.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.renameTeam = this.renameTeam.bind(this);
    }

    setTabValue(event, value) {
        this.props.setTabValue(value);
        this.setState({
            teamNameValue: this.props.teams[value].name
        });
    }

    openRenameTeam(button) {
        this.setState({
            setTeamName: true,
            teamNameValue: this.props.teams[this.props.value].name
        });
    }

    handleInput(event) {
        this.setState({
            teamNameValue: event.target.value
        });
    }
    
    renameTeam() {
        this.props.renameTeam(this.props.value, this.state.teamNameValue);
        this.setState({
            setTeamName: false,
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
                                style={{marginRight: '16px', marginBottom: '16px'}}
                            >
                                Rename Team
                            </Button>
                            {this.state.setTeamName ? 
                                <form >
                                    <Input value={this.state.teamNameValue} style={{marginRight: '16px'}} onChange={this.handleInput}></Input>
                                    <Button variant="contained" color="primary" onClick={this.renameTeam}>Submit</Button>
                                </form> : null}
                        </div>
                        <PlayerTable 
                            data={team.players}
                            teams={this.props.teams}
                            columns={this.columns}
                            indexToAddColumn={0}
                            sortModel={[{'field': 'draft_position_formatted', 'sort': 'asc'}]}
                            onMenuOpen={this.props.onMenuOpen}
                            draftPlayer={this.props.draftPlayer}
                        />
                    </TabPanel>
                ))}
            </TabContext>
        )

        
    }
}
export default withStyles(styles)(TeamTabs);