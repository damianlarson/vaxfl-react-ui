import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import clsx from 'clsx';
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme => createStyles({
    notVaxxed: {
        backgroundColor: '#b71c1c',
        "& .MuiTableCell-root": {
            color: 'white',
        }
    }
})
class DraftDisplay extends React.Component {
    columns = [
        {field: 'name', headerName:"Player Name", flex: 1, headerAlign: 'left', align: 'left',},
        {field: 'player_position', headerName:"Position", flex: 0.5, headerAlign: 'left', align: 'left',},
        {field: 'team', headerName:"Team", flex: 0.5, headerAlign: 'left', align: 'left',},
        {field: 'draft_position_formatted', headerName:"Draft Position", type: 'number', flex: 0.75, headerAlign: 'left', align: 'left',},
        {field: 'drafted_by_formatted', headerName:"Drafted By", flex: 1, headerAlign: 'left', align: 'left',},
    ]

    render() {
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.columns.map(column => (
                                <TableCell key={column.headerName}>{column.headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.draftedPlayers.map(player => (
                            <TableRow key={player.name} className={clsx({[this.props.classes.notVaxxed]: !player.is_vaccinated })}>
                                {this.columns.map(column => (
                                    <TableCell key={player.name+player[column.field]}>{player[column.field]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        
        )
    }
}

export default withStyles(styles)(DraftDisplay);