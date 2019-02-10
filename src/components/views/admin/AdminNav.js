import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';

class AdminNav extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // TODO: add navbar/tabs/...

  // TODO: router

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
          <ul className={classes.navElements}>
            <li className={classes.navElement}>
              <Button component={Link} to='/admin/users' color='primary'>Nutzer verwalten</Button>
            </li>
            <li className={classes.navElement}>
              <Button component={Link} to='/admin/server' color='primary'>Server verwalten</Button>
            </li>
            <li className={classes.navElement}>
              <Button component={Link} to='/admin/texts' color='primary'>Texte hinzufügen</Button>
            </li>
          </ul>
        </Drawer>
      </div>
    )
  }

}

AdminNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    width: 'auto',
    height: '100%',
    //zIndex: 1,
  },
  navElements:{
    listStyleType: "none",
    paddingTop: 100,
    paddingLeft: 0,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    //float: "right",
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