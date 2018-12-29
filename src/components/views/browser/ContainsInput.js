import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//TODO: regex unterstützen
class ContainsInput extends React.Component {
  state = {
    phrases: [],
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;

    return(
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-textarea"
          label="Text enthält"
          placeholder="Geben Sie Stichwörter ein"
          multiline
          className={classes.textField}
          margin="normal"
        />
      </form>
    )
  }

}

ContainsInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 200,
  },
});

export default withStyles(styles)(ContainsInput);