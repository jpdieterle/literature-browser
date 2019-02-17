import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import InfoCard from '../../../InfoCard';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';


class TextManagement extends Component {
  state= {
    newText: '',
    loading: true,
    lastImportTime: 'unbekannt',
    importStatus: 'unbekannt'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // TODO: add text request

  // TODO: format example

  // TODO: text input

  // TODO: submit button

  // TODO: delete input button

  render() {
    const {classes} = this.props;
    const {newText, loading, lastImportTime, importStatus} = this.state;

    return (
      <div>
        <InfoCard message='Hier können Sie weitere Texte zur Datenbank hinzufügen (Freitext-Feld)
        oder die vorhandenen Gedichte aus der Gutenberg-Sammlung aktualisieren indem Sie auf "Import starten" klicken.'/>
        <div className={classes.importContainer}>
          <Typography>Import Status: {importStatus}</Typography>
          <Typography>Letzter Import gestartet: {lastImportTime}</Typography>
          <Button color="inherit"  className={classes.importButton}>Import starten</Button>
        </div>
        <Divider variant="middle" />
        <div className={classes.addTextContainer}>
          <TextField
            variant='outlined'

          ></TextField>
        </div>
      </div>

    )
  }

}

TextManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  textPaper: {
    paddingTop: '10px',
  },
  infoBox:{
    padding: 5,
    display: 'flex',
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
  importButton:{
    backgroundColor: '#CCCCCC',
    marginTop: theme.spacing.unit,
  },
  importContainer:{
    marginLeft: theme.spacing.unit,
  },
  addTextContainer:{

  },
  divider:{
    marginTop: theme.spacing.unit,
  }
});

export default withStyles(styles)(TextManagement);