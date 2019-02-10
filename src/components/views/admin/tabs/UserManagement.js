import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

class UserManagement extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // TODO: add user
  // TODO: remove user
  // TODO: change PW

  render() {
    const {classes} = this.props;

    // TODO: render user list (w/ checkboxes)

    return (
      <div>
        Nutzer hinzufügen, löschen, Passwort ändern
      </div>
    )
  }

}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {},
});

export default withStyles(styles)(UserManagement);