import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';

class ErrorMessage extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderErrorText = statusCode => {
    let errorText = '';
    switch (statusCode) {
      // TODO: insert cases (most relevant error messages)
      default:
        errorText = 'Die Anfrage ist fehlgeschlagen. Bitte versuchen Sie es noch einmal.'
    }
    return errorText;
  };

  render() {
    const {classes, statusCode} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.errorContainer} elevation={0} >
          <Typography className={classes.errorText}>
            {`Es ist ein Fehler aufgetreten: ${this.props.errorMessage}. Bitte versuchen Sie es erneut.`}
          </Typography>
        </Paper>
      </div>
    )
  }

}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  statusCode: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
};

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  errorContainer:{
    padding: theme.spacing.unit,
    background: 'rgba(255, 0, 0, 0.6)',
  },
  errorText:{
    color: 'white',
  }
});

export default withStyles(styles)(ErrorMessage);