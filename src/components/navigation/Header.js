import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

const styles = {

};

function Header(props) {
  const { classes } = props;
  return(
    <div>
      <div>Ich bin der Header!</div>
      <Navbar/>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);