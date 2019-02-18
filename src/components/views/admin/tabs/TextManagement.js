import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import InfoCard from '../../../InfoCard';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import NotificationContext from '../../../notifications/NotificationContext';


class TextManagement extends Component {
  state= {
    newText: '',
    loading: false,
    lastImportTime: 'unbekannt',
    importStatus: 'unbekannt'
  };

  requestImportStatus = () => {
    fetch(' /backend/lib/admin.php',{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({importStatus: true})
    })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success') {
              // import status was loaded from server
              this.handleChange('importStatus', data.importStatus || 'unbekannt');
              this.handleChange('importStatus', data.lastImport || 'unbekannt');
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

  // update state when new text is entered into input field
  handleTextChange = (event) => {
    this.handleChange('newText', event.target.value);
  };

  // delete entered text
  emptyTextField = () => {
    this.handleChange('newText', '');
  };

  // update authors, genres, time range
  updateLogs = () => {
    this.props.requestNewAuthors();
    this.props.requestNewLog();
  };

  // request server to start import from Gutenberg Corpus
  requestImport = () => {
    this.handleChange('loading', true);
    fetch('/backend/lib/admin.php',{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({import: true}),
    })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success') {
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
  };

  // TODO: add text request
  // request server to add input from textfield as new text to database
  requestAddText = () => {
    this.handleChange('loading', true);
    fetch(' /backend/lib/admin.php',{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addText: true,
        text: this.state.newText,
      })
    })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success') {
              // import was started on server
              this.context.handleNotificationChange(true, 'Der Text wurde zur Datenbank hinzugefügt.', 'import', 'success');
              // TODO: load new authors, genres, time range

            } else {
              this.context.handleNotificationChange(true, 'Der Text konnte nicht hinzugefügt werden.', 'import', 'error');
            }
          })
        } else {
          this.context.handleNotificationChange(true, 'Der Text konnte nicht hinzugefügt werden.', 'import', 'error');
        }
        this.handleChange('loading', false);
      })
      .catch(error => {
        this.context.handleNotificationChange(true, 'Der Import konnte auf dem Server nicht gestartet werden.', 'import', 'error');
        this.handleChange('loading', false);
      });
  };

  // TODO: format example
  textExample = `
  (Beispieltext)
  `;
  // show example for how entered text should be formatted
  FormatExample = () => (
    <div>
      <Typography>
        Bitte geben Sie Texte im folgenden Format ein:
      </Typography>
      <Typography>
        {this.textExample}
      </Typography>
    </div>
  );

  render() {
    const {classes} = this.props;
    const {newText, loading, lastImportTime, importStatus} = this.state;

    return (
      <div>
        <InfoCard message='Hier können Sie weitere Texte zur Datenbank hinzufügen (Freitext-Feld)
        oder die vorhandenen Gedichte aus der Gutenberg-Sammlung aktualisieren indem Sie auf "Import starten" klicken.'/>
        <div className={classes.importContainer}>
          <Typography variant={'h6'} color={'primary'}>Import</Typography><br/>
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
          <Typography variant={'h6'} color={'primary'}>Text hinzufügen</Typography><br/>
          {this.FormatExample()}
          <br/>
          <div className={classes.flexContainer}>
            <TextField
              variant='outlined'
              multiline={true}
              className={classes.textInput}
              value={newText}
              onChange={this.handleTextChange}
              disabled={loading}
              placeholder={'Geben Sie hier einen Text ein, der dem Beispiel-Format entspricht.'}
            />
          </div>
          <div className={classes.buttonsContainer}>
            <Button
              className={classes.importButton}
              color={'primary'}
              variant={'contained'}
              disabled={loading}
              onClick={this.requestAddText}
            >
              Text abschicken
            </Button>
            <Button
              className={classes.secondaryButton}
              color={'primary'}
              variant={'text'}
              disabled={loading}
              onClick={this.emptyTextField}
            >
              Eingabe löschen
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

TextManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  requestNewAuthors: PropTypes.func.isRequired,
  requestNewLog: PropTypes.func.isRequired,
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
    width: 800 + theme.spacing.unit*12,
  },
  divider:{
    marginTop: theme.spacing.unit * 5,
    width: 800 + theme.spacing.unit*12,
  },
  buttonsContainer:{
    display: 'flex',
    marginTop: theme.spacing.unit,
  },
  secondaryButton:{
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
  },
});

export default withStyles(styles)(TextManagement);