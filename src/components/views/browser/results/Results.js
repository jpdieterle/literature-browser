import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import fileDownload from 'js-file-download';

class Results extends React.Component {
  state = {};

  downloadResults = () => {
    fileDownload(this.props.data, 'results.json');
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.resultContainer} elevation={0} >
          <Typography className={classes.resultLink}>
            <Link
              onClick={this.downloadResults}
            >
              Ergebnis als ZIP-Datei herunterladen {this.props.numberOfResults && '(' + this.props.numberOfResults + 'Treffer)'}
            </Link>
          </Typography>
        </Paper>
      </div>
    )
  }
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.any.isRequired,
  numberOfResults: PropTypes.number,
};

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  resultContainer:{
    padding: theme.spacing.unit,
    background: 'rgba(0,204,51,0.6)',
  },
  resultLink:{
    color: 'white',
  }
});

export default withStyles(styles)(Results);