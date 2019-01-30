import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

class Admin extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <div></div>
    )
  }

}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {},
});

export default withStyles(styles)(Admin);