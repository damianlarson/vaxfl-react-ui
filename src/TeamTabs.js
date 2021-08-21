import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";
import { TabPanel, TabContext } from '@material-ui/lab';

const styles = theme => createStyles({
    tab: {
        backgroundColor: 'blue'
    }
})
class TeamTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.tabs,
            value: 0
        }
    }
    render() {
        return (
            <TabContext value={this.state.value}>
                <div classes={this.props.classes}>
                    <Tabs inkBarStyle={{background: 'blue'}}>
                        {this.props.tabs.map(tab => (
                            <Tab classes={this.props.classes.tab} label={tab.label} />
                        ))}
                    </Tabs>
                </div>
            </TabContext>
            
        )

        
    }
}
export default withStyles(styles)(TeamTabs);