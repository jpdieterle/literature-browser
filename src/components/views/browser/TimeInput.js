import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

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
      <div className={classes.root}>
        <FormGroup row={true}>
          <TextField
            id="fromYear"
            label="von (Jahr)"
            value={this.state.fromYear}
            onChange={this.handleChange('fromYear')}
            type="number"
            className={classes.textField}
            variant={this.props.variant}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="toYear"
            label="bis (Jahr)"
            value={this.state.toYear}
            onChange={this.handleChange('toYear')}
            type="number"
            className={classes.textField}
            variant={this.props.variant}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormGroup>
      </div>
    )
  }

}

TimeInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root:{
    display: 'flex',
    flexGrow: 1,
    paddingTop: 5,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    position: 'relative',
  },
  textField: {
    maxWidth: 75,
    marginRight: theme.spacing.unit * 2,
  },
  center:{

  },
});

export default withStyles(styles)(TimeInput);