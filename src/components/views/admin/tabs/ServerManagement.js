import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

class ServerManagement extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // TODO: start import request

  // TODO: empty cache request

  render() {
    const {classes} = this.props;

    return (
      <div>
        Import starten oder Cache leeren
      </div>
    )
  }

}

ServerManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {},
});

export default withStyles(styles)(ServerManagement);