import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';


class PlayerTable extends React.Component {
    columns = [
        {field: 'full_name', headerName:"Player Name", flex: 1, headerAlign: 'left',},
        {field: 'player_position', headerName:"Position", flex: 0.75, headerAlign: 'left',},
        {field: 'team', headerName:"Team", flex: 0.75, headerAlign: 'left',},
        {field: 'adp', headerName:"ADP", type: 'number', flex: 0.75, headerAlign: 'left',},
        {field: 'high', headerName:"High", type: 'number', flex: 0.75, headerAlign: 'left',},
        {field: 'low', headerName:"Low", type: 'number', flex: 0.75, headerAlign: 'left',},
        {field: 'bye', headerName:"Bye", type: 'number', flex: 0.75, headerAlign: 'left'},
        {field: 'service', headerName:"Service", flex: 0.75, headerAlign: 'left',},
    ]

    constructor(props) {
        super(props);
        this.state = {
            sortModel: [{
                field: 'adp',
                sort: 'asc'
            }],
        }

        this.onSortModelChange = this.setSortModel.bind(this);
    }

    setSortModel(model) {
        this.setState({
            sortModel: model
        });
    }

    render() {
        return (
            <Paper elevation={3}>
                <DataGrid style={{height: 700, width: '100%'}} columns={this.columns} rows={this.props.data.map((player, index) => ({...player, id: index}))} sortModel={this.state.sortModel} onSortModelChange={(model) => this.onSortModelChange(model)}/>
            </Paper>
        )
    }
      
}

export default PlayerTable;