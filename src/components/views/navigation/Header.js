import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

class Header extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Navbar/>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {

};

export default withStyles(styles)(Header);