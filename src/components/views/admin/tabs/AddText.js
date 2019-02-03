import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

class AddText extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // TODO: add text request

  // TODO: format example

  // TODO: text input

  // TODO: submit button

  // TODO: delete input button

  render() {
    const {classes} = this.props;

    return (
      <div></div>
    )
  }

}

AddText.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {},
});

export default withStyles(styles)(AddText);