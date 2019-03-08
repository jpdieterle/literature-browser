import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import green from '@material-ui/core/colors/green';
import NotificationContext from '../../../notifications/NotificationContext';

// display search results + provide download link
class Results extends React.Component {
  state = {};

  shouldComponentUpdate = (nextProps) => {
    // prevent links from updating after search is complete
    return !(nextProps.formats !== this.props.formats
      && nextProps.searchID === this.props.searchID);
  };

  componentWillUpdate = nextProps => {
    console.log('results will update: ', this.props, nextProps);
  };

  // see if user is still logged in
  requestStatus = func => {
    console.log('requestStatus: ', this.props.sessionID);
    // check if session is still valid otherwise logout user
    fetch("/backend/lib/sessionManagement.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginStatus: true,
        loginID: this.props.sessionID
      })
    }).then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(!data || data.status === 'error') {
              this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error');
              this.props.handleAppChange('loggedIn', false);
              this.props.handleAppChange('isAdmin', false);
            } else {
              func();
            }
          });
        } else {
          this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error');
          this.logout();
        }
      }
    ).catch(error => {
        this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error', 404);
        this.logout();
      }
    );
  };

  downloadResults = (format,getAll) => {
    if(getAll) {
      console.log('getAll request', format);
      let a = document.createElement('a');
      a.href = '/backend/database/_cache/' + format==='json'? 'corpusJson.zip' : 'corpusTxt.zip';
      a.download = true;
      a.click();
    } else {
      console.log('normal request: ', format);
      // request data + handle response for each selected format separately
      fetch("/backend/lib/functions.php", {
        method: 'POST',
        credentials: 'same-origin', // allow cookies -> session management
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          download: this.props.filenames,
          format: format,
        }),
      })
        .then(response => {
          if(response.ok) {
            response.json().then(data => {
              if(data && data.status === 'success') {
                // create invisible anchor and click it
                let a = document.createElement('a');
                a.href = '/backend/database/_cache/' + data.filename;
                a.download = true;
                a.click();
              } else {
                this.context.handleNotificationChange(true, 'Die Ergebnis-Dateien konnten nicht vom Server geladen werden.', 'download', 'error');
              }
            })
          } else {
            this.context.handleNotificationChange(true, 'Die Ergebnis-Dateien konnten nicht vom Server geladen werden.', 'download', 'error');
          }
        })
        .catch((error) => {
          console.error(error);
          this.context.handleNotificationChange(true, 'Die Ergebnis-Dateien konnten nicht vom Server geladen werden.', 'download', 'error');
        });
    }
  };

  render() {
    const {classes, number, formats, getAll} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.resultContainer} elevation={0} >
          <Typography>
            {formats.includes('json') &&
            <Link
              classes={{root: {cursor: 'pointer'}}}
              className={classes.resultLink}
              onClick={() => this.requestStatus(() => this.downloadResults('json', getAll))}
            >
               Suchergebnisse im JSON-Format herunterladen {'(' + number + ' Treffer)'}
            </Link>}
            {formats.includes('txt') &&
            <Link
              classes={{root: {cursor: 'pointer'}}}
              className={classes.resultLink}
              onClick={() => this.requestStatus(() => this.downloadResults('txt', getAll))}
            >
              Suchergebnisse im TXT-Format herunterladen {'(' + number + ' Treffer)'}
            </Link>}
          </Typography>
        </Paper>
      </div>
    )
  }
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
  filenames: PropTypes.string,
  number: PropTypes.number.isRequired,
  formats: PropTypes.arrayOf(PropTypes.string),
  searchID: PropTypes.any.isRequired,
  handleAppChange: PropTypes.func.isRequired,
  sessionID: PropTypes.any.isRequired,
  getAll: PropTypes.bool.isRequired,
};

Results.contextType = NotificationContext;

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  resultContainer:{
    padding: theme.spacing.unit,
    backgroundColor: green[600],
  },
  resultLink:{
    color: 'white',
    display: 'block',
    cursor: 'pointer',
  }
});

export default withStyles(styles)(Results);