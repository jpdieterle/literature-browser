import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// https://reacttraining.com/react-router/web/example/basic

class Navbar extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div></div>
    );
  }

}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {

};

export default withStyles(styles)(Navbar);