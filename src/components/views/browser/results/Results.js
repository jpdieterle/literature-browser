import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';

class Results extends React.Component {
  state = {};

  renderResultText = (message, statusCode) => {
    let errorText = '';
    switch (statusCode) {
      case 404:
        errorText = 'Der Server konnte nicht gefunden werden';
        break;
      case 500:
        errorText = 'Es ist ein Fehler auf dem Server aufgetreten';
        break;
      case 503:
        errorText = 'Der Server ist im Moment nicht verfügbar. Bitte versuchen Sie es später noch einmal.';
        break;
      case 550:
        errorText = 'Sie sind nicht berechtigt, diese Suche durchzuführen.';
        break;
      default:
        errorText = `Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.`
    }
    return errorText;
  };

  render() {
    const {classes, statusCode, errorMessage} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.errorContainer} elevation={0} >
          <Typography className={classes.errorText}>
            {this.renderResultText(errorMessage, statusCode)}
          </Typography>
        </Paper>
      </div>
    )
  }
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.any.isRequired,
  getAll: PropTypes.bool.isRequired,
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

export default withStyles(styles)(Results);