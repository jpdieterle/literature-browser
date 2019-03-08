import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import InfoCard from '../../../InfoCard';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import NotificationContext from '../../../notifications/NotificationContext';

// add new texts to server database, start importing texts from external database on server, view import status
class TextManagement extends Component {
  state= {
    loading: false,
    lastImportTime: 'unbekannt',
    importStatus: 'unbekannt',
    selectedFiles: null,
    progress: 0,
  };

  // see if server is currently importing or when last import was started
  requestImportStatus = () => {
    // check if user is still logged in
    if(this.props.requestStatus() === true) {

      fetch(' /backend/lib/admin.php', {
        method: 'POST',
        credentials: 'same-origin', // allow cookies -> session management
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          importStatus: true,
        })
      })
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              if (data && data.status === 'success') {
                // import status was loaded from server
                this.handleChange('importStatus', data.importStatus || 'unbekannt');
                this.handleChange('lastImportTime', data.lastImport || 'unbekannt');
                this.context.handleNotificationChange(true, 'Der Import Status wurde aktualisiert.', 'importStatus', 'success')
              } else {
                this.context.handleNotificationChange(true, 'Der Import Status konnte nicht vom Server geladen werden.', 'importStatus', 'error');
              }
            })
          } else {
            this.context.handleNotificationChange(true, 'Der Import Status konnte nicht vom Server geladen werden.', 'importStatus', 'error');
          }
        })
        .catch(error => {
          this.context.handleNotificationChange(true, 'Der Import Status konnte nicht vom Server geladen werden.', 'importStatus', 'error');
        });
    }
  };

  componentDidMount = () => {
    // request import state
    this.requestImportStatus();
  };

  // update state
  handleChange = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  // update state when file selection changes
  handleFileChange = (event) => {
    this.handleChange('selectedFiles', event.target.files[0]);
  };

  // update authors, genres, time range
  updateLogs = () => {
    this.props.requestNewAuthors();
    this.props.requestNewLog();
  };

  // request server to start import from Gutenberg Corpus
  requestImport = () => {
    // check if user is still logged in
    if(this.props.requestStatus() === true) {

      this.handleChange('loading', true);
      fetch('/backend/lib/admin.php', {
        method: 'POST',
        credentials: 'same-origin', // allow cookies -> session management
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          import: true,
        }),
      })
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              if (data && data.status === 'success') {
                // import was started on server
                this.context.handleNotificationChange(true, 'Der Import wurde auf dem Server gestartet.', 'import', 'success');
              } else {
                this.context.handleNotificationChange(true, 'Der Import konnte auf dem Server nicht gestartet werden.', 'import', 'error');
              }
            })
          } else {
            this.context.handleNotificationChange(true, 'Der Import konnte auf dem Server nicht gestartet werden.', 'import', 'error');
          }
          this.handleChange('loading', false);
        })
        .catch(error => {
          this.context.handleNotificationChange(true, 'Der Import konnte auf dem Server nicht gestartet werden.', 'import', 'error');
          this.handleChange('loading', false);
        });
    }
  };

  // request server to add input from textfield as new text to database
  requestAddText = () => {
    // check if file has been selected
    if(this.state.selectedFiles === null) {
      this.context.handleNotificationChange(true, 'Bitte wählen Sie zuerst eine Datei aus.', 'addText', 'error');
      return;
    }

    // check if user is still logged in
    if(this.props.requestStatus() === true) {

      this.handleChange('loading', true);

      let data = new FormData();
      data.append('file', this.state.selectedFiles);
      data.append('addText', 'true');

      fetch('/backend/lib/admin.php', {
        method: 'POST',
        credentials: 'same-origin', // allow cookies -> session management
        headers: {},
        body: data,
      })
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              if (data && data.status === 'success') {
                // import was started on server
                this.context.handleNotificationChange(true, 'Der/die Text/e wurde/n zur Datenbank hinzugefügt.', 'import', 'success');
                this.updateLogs();

              } else {
                this.context.handleNotificationChange(true, 'Der Upload konnte nicht hinzugefügt werden.', 'import', 'error');
              }
            })
          } else {
            this.context.handleNotificationChange(true, 'Der Upload nicht hinzugefügt werden.', 'import', 'error');
          }
          this.handleChange('loading', false);
        })
        .catch(error => {
          this.context.handleNotificationChange(true, 'Der Upload konnte nicht hinzugefügt werden.', 'import', 'error');
          this.handleChange('loading', false);
        });
    }
  };

  render() {
    const {classes} = this.props;
    const {loading, lastImportTime, importStatus} = this.state;

    return (
      <div>
        <InfoCard message='Hier können Sie weitere Texte als .txt und/oder .json Dateien zur Datenbank hinzufügen
        oder die vorhandenen Gedichte aus der Gutenberg-Sammlung auf dem Server aktualisieren indem Sie auf "Import starten" klicken.'/>
        <div className={classes.importContainer}>
          <Typography variant={'h6'} color={'primary'}>Import Gutenberg</Typography><br/>
          <Typography>Import Status: {importStatus}</Typography>
          <Typography>Letzter Import gestartet: {lastImportTime}</Typography>
          <div className={classes.buttonsContainer}>
            <Button
              className={classes.importButton}
              color={'primary'}
              variant={'contained'}
              disabled={loading}
              onClick={this.requestImport}
            >
              Import starten
            </Button>
            <Button
              className={classes.secondaryButton}
              color={'primary'}
              variant={'text'}
              disabled={loading}
              onClick={this.requestImportStatus}
            >
              Import-Status aktualisieren
            </Button>
          </div>
        </div>
        <Divider variant='middle' className={classes.divider}/><br/>
        <div className={classes.addTextContainer}>
          <Typography variant={'h6'} color={'primary'}>Text hinzufügen (.json Format)</Typography>
          <div className={classes.buttonsContainer}>
            <TextField
              InputProps={{root: classes.textInput}}
              inputProps={{
                accept: '.txt, .json'
              }}
              id="fileUpload"
              multiple
              type={'file'}
              onChange={this.handleFileChange}
              variant={'outlined'}
            />
            <div className={classes.flexContainer}>
              <Button
                className={classes.importButton}
                variant={'contained'}
                component={'span'}
                color={'primary'}
                disabled={loading}
                onClick={this.requestAddText}
              >
                Datei hochladen
              </Button>
            </div>
          </div>
          <br/>
        </div>
      </div>
    )
  }
}

TextManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  requestNewAuthors: PropTypes.func.isRequired,
  requestNewLog: PropTypes.func.isRequired,
  requestStatus: PropTypes.func.isRequired,
};

TextManagement.contextType = NotificationContext;

const styles = theme => ({
  textPaper: {
    paddingTop: '10px',
  },
  importButton:{
    marginTop: theme.spacing.unit,
  },
  importContainer:{
    marginLeft: theme.spacing.unit,
  },
  addTextContainer:{
    marginLeft: theme.spacing.unit,
  },
  textInput:{
    width: 380,
    padding: theme.spacing.unit,
  },
  divider:{
    marginTop: theme.spacing.unit * 5,
    width: 800 + theme.spacing.unit*12,
  },
  buttonsContainer:{
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  secondaryButton:{
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },
  newLine:{
    whiteSpace: 'pre-wrap',
  }
});

export default withStyles(styles)(TextManagement);