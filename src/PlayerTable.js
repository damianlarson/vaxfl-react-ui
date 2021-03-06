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
        {field: 'drafted_by', headerName: 'Option', flex: 0.75, headerAlign: 'left', align: 'center',
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
                        style={{maxHeight: '300px'}}
                        TransitionProps={{onEnter: () => {this.props.onMenuOpen()}}}
                    >
                        {this.props.teams.map((team, index) => {
                            if (index !== params.value) {
                                return <MenuItem key={index} onClick={(e) => this.handleClose(e, index)}>Draft to Team {index+1}</MenuItem>
                            } else return null
                        })}
                    </Menu>
                </div>
                
            )
        },
    ]

    constructor(props) {
        super(props);

        this.state = {
            sortModel: this.props.sortModel,
            anchorEl: null
        }
        this.onSortModelChange = this.setSortModel.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSelectionModelChange = this.onSelectionModelChange.bind(this);
        this.props.columns.forEach((column, index) => {
            this.columns.splice(this.props.indexToAddColumn + index, 0, column);
        });
    }

    handleClose(event, index) {
        this.setAnchorEl(null);
        if (event.target.value !== undefined) {
            this.props.draftPlayer(this.state.selected, index);
        }
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
        this.setAnchorEl(button);
    }

    setSortModel(model) {
        this.setState({
            sortModel: model
        });
    }

    onSelectionModelChange(event) {
        this.setState({
            selected: this.props.data[event[0]]
        })
    }

    getDataToDisplay() {
        return this.props.data.map((player, index) => ({...player, id: index}));
    }

    render() {
        return (
            <Paper elevation={1} className={this.props.classes.root}>
                <DataGrid 
                    align='left' 
                    getRowClassName={(params) => `theme-vaxxed-${params.row.is_vaccinated}`} 
                    style={{height: 500, width: '100%'}} 
                    columns={this.columns} 
                    rows={this.getDataToDisplay()} 
                    sortModel={this.state.sortModel} 
                    onSortModelChange={(model) => this.onSortModelChange(model)}
                    onSelectionModelChange={this.onSelectionModelChange}
                />
            </Paper>
        )
    }
      
}

export default withStyles(styles)(PlayerTable);