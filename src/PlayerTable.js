import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Paper, Button, Menu, MenuItem } from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme => createStyles({
    root: {
        "& .theme-vaxxed-false": {
            backgroundColor: '#b71c1c',
            color: 'white',
            '&:hover': {
                backgroundColor: '#7f0000',
            },
        },
        "& .theme-vaxxed-false.Mui-selected": {
            backgroundColor: '#8f0000',
            color: 'white',
            '&:hover': {
                backgroundColor: '#7f0000',
            },
        }
        
    },
})

class PlayerTable extends React.Component {
    columns = [
        {field: 'name', headerName:"Player Name", flex: 1, headerAlign: 'left', align: 'left',},
        {field: 'player_position', headerName:"Position", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'team', headerName:"Team", flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'adp', headerName:"ADP", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'high', headerName:"High", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'low', headerName:"Low", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'bye', headerName:"Bye", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'vaccination_status', headerName:"Vaccinated?", flex: 0.75, headerAlign: 'left', align: 'left',
        renderCell: (params) => (
            <strong>
              {(params.value)}
            </strong>
          ),
        },
        {field: 'button', headerName: 'Option', flex: 0.75, headerAlign: 'left', align: 'center',
            renderCell: (params) => (
                <div style={{width: '100%'}}>
                    <Button
                        variant="contained"
                        fullWidth={true}
                        onClick={(button) => this.onButtonClick(button)}
                    >
                        SELECT
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
                
            )
        },
    ]

    constructor(props) {
        super(props);
        this.state = {
            sortModel: [{
                field: 'adp',
                sort: 'asc'
            }],
            anchorEl: null
        }
        this.onSortModelChange = this.setSortModel.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setAnchorEl(null);
    }

    setAnchorEl(event) {
        if (event) {
            this.setState({
                anchorEl: event.currentTarget
            });
        } else {
            this.setState({
                anchorEl: null
            })
        }
        
    }

    onButtonClick(button) {
        console.log(button);
        this.setAnchorEl(button);
    }

    setSortModel(model) {
        this.setState({
            sortModel: model
        });
    }

    getDataToDisplay() {
        return this.props.data.map((player, index) => ({...player, id: index}));
    }

    render() {
        return (
            <Paper elevation={1} className={this.props.classes.root}>
                <DataGrid align='left' getRowClassName={(params) => `theme-vaxxed-${params.row.is_vaccinated}`} style={{height: 700, width: '100%'}} columns={this.columns} rows={this.getDataToDisplay()} sortModel={this.state.sortModel} onSortModelChange={(model) => this.onSortModelChange(model)}/>
            </Paper>
        )
    }
      
}

export default withStyles(styles)(PlayerTable);