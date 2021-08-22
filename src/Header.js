import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme => createStyles({
    hide: {
        display: 'none'
    }
})
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.toggleDrawerOpen();
    }

    render() {
        return (
            <AppBar position="sticky" style={{marginBottom: '32px'}}>
                <Toolbar>
                    <Typography variant="h6">
                        VaxFL
                    </Typography>
                    <IconButton onClick={this.onClick} style={{marginLeft: "auto"}} className={clsx(this.props.open && this.props.classes.hide)}>
                        <ChevronLeftIcon style={{color: 'white'}} />
                    </IconButton>

                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header);
