import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";







function ButtonAppBar(props) {
  const { classes } = props;
  return (
      <div className={classes.root}>
        <AppBar className={classes.heightfix} position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
            />
            <div className={classes.col4}>
              <img className={classes.imgresponsive} src={'img/1064px-Fub-logo.png'}  alt={"FU-Berlin"} />
            </div>
            <div className={classes.col8}>
              <Router>
                <ul className={classes.navElements} >
                  <li className={classes.login}> <Button color="inherit" className={classes.buttonstyle}><Link to='./components/views/About'/>About</Button></li>
                  <li className={classes.login}> <Button color="inherit" className={classes.buttonstyle}><Link to='./components/views/Wiki'/>Wiki </Button></li>
                  <li className={classes.login}> <Button color="inherit" className={classes.buttonstyle}><Link to='./components/views/Login'/>Login</Button></li>
                </ul>
              </Router>
            </div>
          </Toolbar>
        </AppBar>
      </div>
  );
}

class Header extends React.Component {
  state = {

  };

  render() {
    return(
        <div>
          <Header>
          </Header>
        </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    zIndex: '999!important',

  },
  heightfix: {
    height: "50px"
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
    width:"70%",
    padding: '5px'
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


  }
};

export default withStyles(styles)(ButtonAppBar);


ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

