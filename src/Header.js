import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Header extends React.Component {
    render() {
        return (
            <AppBar style={{marginBottom: 32}} position='static'>
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
