import React from 'react';
import { Select, InputLabel } from '@material-ui/core';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'std'
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
            <div>
                <InputLabel id="label">Scoring</InputLabel>
                <Select native value={this.state.selected} onChange={this.handleEvent}>
                    <option value='std'>Standard</option>
                    <option value='half'>0.5 PPR</option>
                    <option value='full'>PPR</option>
                </Select>
            </div>
        )
    }
}

export default Selector;