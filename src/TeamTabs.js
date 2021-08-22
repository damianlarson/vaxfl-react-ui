import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
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
            value: '0'
        }
        this.setTabValue = this.setTabValue.bind(this);
    }

    setTabValue(event, value) {
        console.log(value);
        this.setState({
            value: value
        });
    }
    render() {
        return (
            <TabContext value={this.state.value}>
                <Tabs value={this.state.value} onChange={this.setTabValue}>
                    {this.props.teams.map(team => (
                        <Tab 
                            label={team.name} value={`${team.index}`} 
                            key={team.index} 
                            classes={{ root: this.props.classes.root }}                            
                        />
                    ))}
                </Tabs>
                {this.props.teams.map((team) => (
                    <TabPanel key={team.index+'panel'} value={`${team.index}`}>{team.players.map(player => (
                        <div>{player.name}</div>
                    ))}</TabPanel>
                ))}
            </TabContext>
        )

        
    }
}
export default withStyles(styles)(TeamTabs);