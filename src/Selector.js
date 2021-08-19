import React from 'react';
import { Select, InputLabel } from '@material-ui/core';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'std',
            style: this.props.style
        }
        this.handleEvent = this.handleEvent.bind(this);
    }
    handleEvent = (event) => {
        this.setState({
            selected: event.target.value
        });
        this.props.handleEvent(event.target.value);
    }
    render() {
        return (
            <div style={this.state.style}>
                <div>
                <InputLabel style={{width:100}} id="label">Scoring</InputLabel>
                <Select style={{width: 100}}native value={this.state.selected} onChange={this.handleEvent}>
                    <option value='std'>Standard</option>
                    <option value='half'>0.5 PPR</option>
                    <option value='full'>PPR</option>
                </Select>
                </div>

            </div>
        )
    }
}

export default Selector;