import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class Header extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            />
            <div >
              <img className={classes.imgresponsive} src={'img/fu-logo_blue.svg'}  alt={"FU-Berlin"} />
            </div>
            <div className={classes.col8}>
              <ul className={classes.navElements} >
                <li className={classes.login}>
                  <Button component={Link} to='/browser' color="inherit" className={classes.buttonstyle}>Browser</Button>
                </li>
                <li className={classes.login}>
                  <Button component={Link} to='/about' color="inherit" className={classes.buttonstyle}>About</Button>
                </li>
                <li className={classes.login}>
                  <Button component={Link} to='/wiki' color="inherit" className={classes.buttonstyle}>Wiki </Button>
                </li>
                <li className={classes.login}>
                  <Button component={Link} to='/admin' color="inherit" className={classes.buttonstyle}>Admin</Button>
                </li>
                <li className={classes.login}>
                  <Button component={Link} to='/login' color="inherit" className={classes.buttonstyle}>Login</Button>
                </li>
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
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12
  },
  toolbar: {
    backgroundColor: "#99CC00"
  },
  imgresponsive: {
    width:"100%",
    padding: '10px'
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
  login:{
    display:'inline-block',
  },
  buttonstyle: {
    fontSize: '13px'
  }
});

export default withStyles(styles)(Header);

