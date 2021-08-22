import React from 'react';
import {Drawer, IconButton, Typography} from '@material-ui/core';
import { withStyles, createStyles } from "@material-ui/core/styles";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const styles = theme => createStyles({
    drawer: {
        width: props => props.width,
        flexShrink: 0,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }), 
    },
    paper: {
        width: props=>props.width,
    },
    drawerHeader: {
        backgroundColor: '#3f51b5',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        height: '64px',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
    }
})
class DraftOrderDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.toggleDrawerOpen();
    }
    render() {
        return (
            <Drawer className={this.props.classes.drawer} anchor="right" open={this.props.isDrawerOpen} variant="persistent" classes={{paper: this.props.classes.paper}}>
                <div className={this.props.classes.drawerHeader}>
                    <IconButton onClick={this.onClick}>
                        <ChevronRightIcon style={{color: 'white'}} />
                    </IconButton>
                    <Typography style={{margin: 'auto 0'}}>Players Drafted</Typography>            
                </div>
            </Drawer>
        )
        
    }
}

export default withStyles(styles)(DraftOrderDrawer);