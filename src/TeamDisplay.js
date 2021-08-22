import React from 'react';
import TeamTabs from './TeamTabs';
import Selector from './Selector';
class TeamDisplay extends React.Component {
    options = [
        {value: '6', display: '6'},
        {value: '8', display: '8'},
        {value: '10', display: '10'},
        {value: '12', display: '12'},
        {value: '14', display: '14'},
        {value: '16', display: '16'},
    ]

    constructor(props) {
        super(props);
        const tabs = [];
        for (let i = 0; i < 12; ++i) {
            tabs.push({label: `team${i + 1}`, value: `${i}`,});
        }
        this.state = {
            tabs: tabs,
            teams: this.props.teams,
            tabValue: '0'
        };
        this.setTeamCount = this.setTeamCount.bind(this);
        this.renameTeam = this.renameTeam.bind(this);
        this.setTabValue = this.setTabValue.bind(this);
    }

    setTeamCount(value) {
        const tabs = this.state.tabs.map(a => Object.assign({}, a));
        let tabValue = this.state.tabValue;
        if (value > tabs.length) {
            for (let i = tabs.length; i < value; ++i) {
                tabs.push({label: `team${i + 1}`, value: `${i}`, data: {}});
            }
        } else {
            tabs.length = value;
            tabValue = tabs.length - 1;
        }
        
        this.setState({
            tabs: tabs,
            tabValue: `${tabValue}`
        });
        this.props.setTeamCount(value);
    }
    renameTeam(teamIndex, teamName) {
        this.props.renameTeam(teamIndex, teamName);
    }

    setTabValue(tab) {
        this.setState({
            tabValue: tab
        });
    }
    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent:'flex-start', marginBottom: 16, marginLeft: 16}}>
                    <Selector handleEvent={this.setTeamCount} options={this.options} label={'Team Count'} defaultSelected="12"/>
                </div>
                <TeamTabs 
                    tabs={this.state.tabs} 
                    teams={this.state.teams} 
                    renameTeam={this.renameTeam} 
                    value={this.state.tabValue}
                    setTabValue={this.setTabValue}
                    onMenuOpen={this.props.onMenuOpen}
                    draftPlayer={this.props.draftPlayer}
                />
            </div>
        )
    }
}

export default TeamDisplay;