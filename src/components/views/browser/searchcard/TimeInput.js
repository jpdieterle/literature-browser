import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';

class TimeInput extends React.PureComponent {
  state = {
    timeFrom: this.props.initialTimeFrom,
    timeTo: this.props.initialTimeTo,
    timeFromError: false,
    timeToError: false,
  };

  handleChange = name => event => {
    const value = event.target.value;
    const time = parseInt(value);
    let newState = {};
    if(name === 'timeFrom') {
      newState.timeFromError = (time < this.props.minYear || time > this.props.maxYear);
    } else if(name === 'timeTo') {
      newState.timeToError = (time < this.props.minYear || time > this.props.maxYear);
    }

    this.setState(newState, () => {
      this.props.handleBrowserChange('timeError')
      this.setState({
        [name]: value,
      }, () => {
        if(!this.state.timeFromError && !this.state.timeToError) {
          this.props.onInputChange(this.props.cardId, name, this.state[name]);
        }
      });
    });
  };

  render() {
    const { classes, variant, initialTimeTo, initialTimeFrom, disabled } = this.props;
    const { timeFrom, timeTo } = this.state;

    return(
      <div className={classes.root}>
        <FormGroup row={true}>
          <TextField
            id="fromYear"
            label="von (Jahr)"
            inputProps={{min: initialTimeFrom , max: initialTimeTo}}
            value={timeFrom}
            onChange={this.handleChange('timeFrom')}
            type="number"
            className={classes.textField}
            variant={variant}
            disabled={disabled}
            error={this.state.timeFromError}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="toYear"
            label="bis (Jahr)"
            inputProps={{min: initialTimeFrom , max: initialTimeTo}}
            value={timeTo}
            onChange={this.handleChange('timeTo')}
            type="number"
            className={classes.textField}
            variant={variant}
            disabled={disabled}
            error={this.state.timeToError}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {(this.state.timeToError || this.state.timeFromError) &&
          <Typography color={'error'}>
            Bitte geben Sie eine Zahl zwischen {this.props.minYear} und {this.props.maxYear} ein.
          </Typography>}
        </FormGroup>
      </div>
    )
  }
}

TimeInput.propTypes = {
  classes: PropTypes.object.isRequired,
  cardId: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  initialTimeFrom: PropTypes.string.isRequired,
  initialTimeTo: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  minYear: PropTypes.string.isRequired,
  maxYear: PropTypes.string.isRequired,
  handleBrowserChange: PropTypes.func.isRequired,
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