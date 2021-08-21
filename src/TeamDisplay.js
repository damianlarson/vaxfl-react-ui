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
            tabs.push({label: `team${i + 1}`, value: `${i}`});
        }
        this.state = {
            tabs: tabs
        };
        this.setTeamCount = this.setTeamCount.bind(this);
    }

    setTeamCount(value) {
        const tabs = this.state.tabs.map(a => Object.assign({}, a));
        if (value > tabs.length) {
            for (let i = tabs.length; i < value; ++i) {
                tabs.push({label: `team${i + 1}`, value: `${i}`});
            }
        } else {
            tabs.length = value;
        }
        
        console.log(tabs);
        this.setState({
            teamCount: value,
            tabs: tabs
        });
    }
    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent:'flex-start', marginBottom: 16, marginLeft: 16}}>
                    <Selector handleEvent={this.setTeamCount} options={this.options} label={'Team Count'} defaultSelected="12"/>
                </div>
                <TeamTabs tabs={this.state.tabs}/>
            </div>
        )
    }
}

export default TeamDisplay;