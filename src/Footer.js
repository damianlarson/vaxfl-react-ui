import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme => createStyles({
    footer: {
        backgroundColor: '#3f51b5',
        color: 'white',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        "& a": {
            color: 'white'
        }
    }
})

class Footer extends React.Component {
    render() {
        return(
            <div className={this.props.classes.footer}>
                <Typography>
                    Created by <a href="https://github.com/damianlarson">@damianlarson</a> on Github. All data sourced from the great folks at <a href="https://fantasyfootballcalculator.com/">Fantasy Football Calculator.</a> Icons made by <a href="https://flat-icons.com/" title="Flat Icons">Flat Icons</a>.
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(Footer);