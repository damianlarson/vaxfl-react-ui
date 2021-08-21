import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";
import { TabPanel, TabContext } from '@material-ui/lab';


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
                <div>
                    <Tabs value={this.state.value} onChange={this.setTabValue}>
                        {this.props.tabs.map(tab => (
                            <Tab label={tab.label} value={tab.value} key={tab.value}/>
                        ))}
                    </Tabs>
                </div>
            </TabContext>
            
        )

        
    }
}
export default (TeamTabs);