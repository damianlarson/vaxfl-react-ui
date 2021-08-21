import React from 'react';
import { Select, InputLabel } from '@material-ui/core';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.defaultSelected,
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
                <div style={{width: '100%'}}>
                <InputLabel id="label">{this.props.label}</InputLabel>
                <Select style={{width: '100%'}} native value={this.state.selected} onChange={this.handleEvent}>
                    {this.props.options.map(option => (
                        <option value={option.value}>{option.display}</option>

                    ))}
                </Select>
                </div>

            </div>
        )
    }
}

export default Selector;