import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Header extends React.Component {
  state = {

  };

  render() {
    const { classes, loggedIn, isAdmin } = this.props;

    return(
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <div className={classes.col4}>
              <img className={classes.img} src={'img/fu-logo_blue.svg'} alt={"FU-Berlin"} />
            </div>
            <div className={classes.col8}>
              <ul className={classes.navElements} >
                <li className={classes.navElement}>
                  <Button component={Link} to='/' color="inherit" className={classes.buttonstyle}>Browser</Button>
                </li>
                <li className={classes.navElement}>
                  <Button component={Link} to='/about' color="inherit" className={classes.buttonstyle}>About</Button>
                </li>
                <li className={classes.navElement}>
                  <Button component={Link} to='/wiki' color="inherit" className={classes.buttonstyle}>Wiki </Button>
                </li>
                {isAdmin && <li className={classes.navElement}>
                  <Button component={Link} to='/admin' color="inherit" className={classes.buttonstyle}>Admin</Button>
                </li>}
                {!loggedIn && <li className={classes.navElement}>
                  <Button component={Link} to='/login' color="inherit" className={classes.buttonstyle}>Login</Button>
                </li>}
                {loggedIn && <li className={classes.navElement}>
                  <Button color="primary" className={classes.buttonstyle}>Logout</Button>
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
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: '999!important',
    width: '100%',
    height: 88,
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
});

export default withStyles(styles)(Header);

