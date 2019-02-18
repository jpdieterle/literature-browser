import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import logo from './img/fu-logo_blue.svg';

class Header extends React.Component {
  state = {

  };

  render() {
    const { classes, loggedIn, isAdmin, logout } = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.onTop}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.col4}>
              <img className={classes.img} src={logo} alt={"FU-Berlin"} />
            </div>
            <div className={classes.col8}>
              <ul className={classes.navElements} >
                <li className={classes.navElement}>
                  <Button component={Link} to='/' color="inherit" className={classes.buttons}>Browser</Button>
                </li>
                <li className={classes.navElement}>
                  <Button component={Link} to='/about' color="inherit" className={classes.buttons}>About</Button>
                </li>
                <li className={classes.navElement}>
                  <Button component={Link} to='/wiki' color="inherit" className={classes.buttons}>Wiki </Button>
                </li>
                {loggedIn && isAdmin && <li className={classes.navElement}>
                  <Button component={Link} to='/admin' color="inherit" className={classes.buttons}>Admin</Button>
                </li>}
                {!loggedIn && <li className={classes.navElement}>
                  <Button component={Link} to='/login' color="inherit" className={classes.buttons}>Login</Button>
                </li>}
                {loggedIn && <li className={classes.navElement}>
                  <Button color="primary" className={classes.buttons} onClick={logout}>Logout</Button>
                </li>}
              </ul>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 88,
  },
  onTop:{
    zIndex: theme.zIndex.drawer + 1,
  },
  heightfix: {
    height: 88
  },
  grow: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: "#99CC00",
    height: 88,
    minWidth: 608,
  },
  img: {
    width: 240,
    verticalAlign: 'middle',
  },
  col4:{
    width:"30%",
  },
  col8:{
    width:"70%",
  },
  navElements:{
    listStyleType: "none",
    float: "right",
  },
  navElement:{
    display:'inline-block',
  },
  buttons:{},
});

export default withStyles(styles)(Header);

