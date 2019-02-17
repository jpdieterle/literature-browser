import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class AdminNav extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <List className={classes.navElements}>
            <ListItem button component={Link} to='/admin/texts' color='primary'>
              <ListItemText primary={<Typography color={'primary'} variant={'overline'}>Texte verwalten</Typography>}/>
            </ListItem>
            <ListItem button component={Link} to='/admin/users' color='primary'>
              <ListItemText primary={<Typography color={'primary'} variant={'overline'}>Nutzer verwalten</Typography>} />
            </ListItem>
            <ListItem button component={Link} to='/admin/server' color='primary'>
              <ListItemText primary={<Typography color={'primary'} variant={'overline'}>Server verwalten</Typography>}/>
            </ListItem>
          </List>
        </Drawer>
      </div>
    )
  }

}

AdminNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({
  root: {
    width: 'auto',
    height: '100%',
    //zIndex: 1,
  },
  navElements:{
    paddingTop: 100,
    height: 150,
  },
  navElement:{
    //display:'block',
  },
  drawer:{
    width: 200,
    flexShrink: 0,
  },
  drawerPaper:{
    width: 200,
    backgroundColor: '#e8e8e8',
  },
});

export default withStyles(styles)(AdminNav);