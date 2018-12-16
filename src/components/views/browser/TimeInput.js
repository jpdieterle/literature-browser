import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class TimeInput extends React.Component {
  state = {
    fromYear: 1700,
    toYear: 1950,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return(
      <div>
        <TextField
          id="fromYear"
          label="von (Jahr)"
          value={this.state.fromYear}
          onChange={this.handleChange('fromYear')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="toYear"
          label="bis (Jahr)"
          value={this.state.toYear}
          onChange={this.handleChange('toYear')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </div>
    )
  }

}

TimeInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 100,
    maxWidth: 350,
  },
});

export default withStyles(styles)(TimeInput);