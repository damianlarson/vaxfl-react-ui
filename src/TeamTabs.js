import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { withStyles, createStyles } from '@material-ui/styles';

const styles = (theme) => createStyles({
    root: {
        flex: 1,
        minWidth: '1px',
        maxWidth: '100%'
    }
})

class TeamTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.tabs,
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
                    {this.props.tabs.map(tab => (
                        <Tab label={tab.label} value={tab.value} key={tab.value} classes={{ root: this.props.classes.root }}/>
                    ))}
                </Tabs>
                {this.props.teams.map((team, index) => (
                    <TabPanel key={index} value={`${index}`}>{team.players.map(player => (
                        <div>{player.name}</div>
                    ))}</TabPanel>
                ))}
            </TabContext>
        )

        
    }
}
export default withStyles(styles)(TeamTabs);