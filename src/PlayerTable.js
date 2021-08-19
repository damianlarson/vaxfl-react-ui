import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme => createStyles({
    root: {
        "& .theme-vaxxed-false": {
            backgroundColor: '#9b0000',
            color: 'white',
            '&:hover': {
                backgroundColor: '#d50000'
            },
        },
        "& .theme-vaxxed-false.Mui-selected": {
            backgroundColor: '#9b0000',
            color: 'white',
            '&:hover': {
                backgroundColor: '#d50000'
            },
            textDecoration: 'line-through'
        }
        
    },
})

class PlayerTable extends React.Component {
    columns = [
        {field: 'full_name', headerName:"Player Name", flex: 1, headerAlign: 'left', align: 'left',},
        {field: 'player_position', headerName:"Position", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'team', headerName:"Team", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'adp', headerName:"ADP", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'high', headerName:"High", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'low', headerName:"Low", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'bye', headerName:"Bye", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'vaccination_status', headerName:"Vaccinated?", flex: 0.75, headerAlign: 'left', align: 'left',},
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
            <Paper elevation={3} className={this.props.classes.root}>
                <DataGrid checkboxSelection align='left' getRowClassName={(params) => `theme-vaxxed-${params.row.is_vaccinated}`} style={{height: 700, width: '100%'}} columns={this.columns} rows={this.props.data.map((player, index) => ({...player, id: index}))} sortModel={this.state.sortModel} onSortModelChange={(model) => this.onSortModelChange(model)}/>
            </Paper>
        )
    }
      
}

export default withStyles(styles)(PlayerTable);