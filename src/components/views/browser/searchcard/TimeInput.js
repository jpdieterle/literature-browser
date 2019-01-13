import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

class TimeInput extends React.Component {
  state = {
    timeFrom: this.props.initialTimeFrom,
    timeTo: this.props.initialTimeTo,
  };

  handleChange = name => event => {
    console.log('name: ' +name);
    this.setState({
      [name]: event.target.value,
    }, () => {
      // console.log(this.state);
      this.props.onInputChange(this.props.cardId, name, this.state[name]);
    });
  };

  render() {
    const { classes, variant, initialTimeTo, initialTimeFrom, getDisabled } = this.props;
    const { timeFrom, timeTo } = this.state;

    return(
      <div className={classes.root}>
        <FormGroup row={true}>
          <TextField
            id="fromYear"
            label="von (Jahr)"
            inputProps={{min: initialTimeFrom.toString() , max: initialTimeTo.toString(), step: '1'}}
            value={timeFrom}
            onChange={this.handleChange('timeFrom')}
            type="number"
            className={classes.textField}
            variant={variant}
            disabled={getDisabled()}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="toYear"
            label="bis (Jahr)"
            inputProps={{min: initialTimeFrom.toString() , max: initialTimeTo.toString(), step: '1'}}
            value={timeTo}
            onChange={this.handleChange('timeTo')}
            type="number"
            className={classes.textField}
            variant={variant}
            disabled={getDisabled()}
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
  cardId: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  initialTimeFrom: PropTypes.string.isRequired,
  initialTimeTo: PropTypes.string.isRequired,
  getDisabled: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
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