import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

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
      <div></div>
    )
  }

}

AdminNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {},
});

export default withStyles(styles)(AdminNav);