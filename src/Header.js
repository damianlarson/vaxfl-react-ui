import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Header extends React.Component {
    render() {
        return (
            <AppBar position="sticky" style={{marginBottom: '32px'}}>
                <Toolbar>
                    <Typography variant="h6">
                        VaxFL
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;
