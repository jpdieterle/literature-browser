import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

class ContainsInput extends React.PureComponent {
  state = {
    keywords: this.props.initialValue,
    dialogOpen: false,
    syntaxError: false,
    errorMessage: 'Fehler',
  };

  onInputChange = (event) => {
    this.setState({keywords: event.target.value,}, () => {
      this.props.onInputChange(this.props.cardId, 'keywords', this.state.keywords); // update SearchCard
    });
  };

  onFocus = () => {
    this.setState({syntaxError: false})
  };

  onOpenDialog = () => {
    this.setState({dialogOpen: true})
  };

  onCloseDialog = () => {
    this.setState({dialogOpen: false})
  };

  checkInput = () => {
    console.log('checking input');
    let error = false;
    let errorMessage = '';
    //let string = this.state.keywords;

    this.setState({
      syntaxError: error,
      errorMessage: errorMessage,
    }, () => {
      this.props.handleBrowserChange('keywordError', error);
    });
  };

  render() {
    const { classes, variant, disabled } = this.props;
    const { keywords, syntaxError } = this.state;

    return(
      <div className={classes.root}>
        <TextField
          id="textContains"
          label="Text enthält"
          placeholder="Geben Sie Stichwörter ein"
          multiline
          fullWidth={true}
          className={classes.textField}
          variant={variant}
          disabled={disabled}
          error={syntaxError}
          value={keywords}
          onChange={this.onInputChange}
          onFocus={this.onFocus}
          onBlur={this.checkInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.onOpenDialog}>
                  <InfoIcon />
                </IconButton>
              </InputAdornment>)}}
        />

        {(this.state.syntaxError || this.state.timeFromError) &&
        <Typography color={'error'} className={classes.errorMessage}>{this.state.errorMessage}</Typography>}

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.onCloseDialog}
          aria-labelledby="dialogTitle"
          className={classes.dialogWrapper}
        >
          <Typography variant={"h6"} color="primary" className={classes.listHeader}>Hinweise zum "Text enthält" Suchfeld</Typography>
          <div className={classes.listWrapper}>
            <ul>
              <Typography color={"error"}>
                <b>Achtung: Durch umfangreiche Eingaben wird die Suche auf dem Server sehr speicherintensiv und kann eventuell nicht ausgeführt werden.
                  Liefert eine Anfrage keine Ergebnisse, so kann dies auch an einer falschen Syntax in diesem Feld liegen.</b>
              </Typography>
              <li>
                <Typography>Geben Sie <b>einzelne Wörter oder Phrasen</b> an.</Typography>
                <Typography color={"textSecondary"}>Bsp.: Der Frühling ist schön</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte, die die exakte Phrase enthalten. Groß- und Kleinschreibung wird nicht beachtet.</Typography>
              </li>
              <li>
                <Typography>Wenn Sie Phrasen suchen, die mit einem bestimmten Wort anfangen, kennzeichnen Sie dies mit einem <b>Stern</b> (*) am Ende der Phrase.</Typography>
                <Typography color={"textSecondary"}>Bsp.: Blume*</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte mit dem Wort Blume und auch z.B. Blumenstrauß, aber nicht Ringelblume.</Typography>
              </li>
              <li>
                <Typography>Verbinden Sie Phrasen durch ein <b>"and"</b>.</Typography>
                <Typography color={"textSecondary"}>Bsp.: Frühling "and" Sonne</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte, die die Worte "Frühling" und "Sonne" gleichzeitig enthalten.</Typography>
              </li>
              <li>
                <Typography>Verwenden Sie <b>"or"</b>, um nach alternativen Phrasen zu suchen. Sie können bis zu 3 Mal in einer Teil-Suche "or" verwenden.</Typography>
                <Typography color={"textSecondary"}>Bsp.: Frühling "or" Sonne</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte, die mindestens eins der Worte "Frühling" und "Sonne" enthalten.</Typography>
                <Typography color={"textSecondary"}>Bsp.: Frühling "or" Sonne "or" die Welt ist schön "or" die Blumen blühen</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte, die mindestens eine der 4 Wörter/Phrasen enthalten.</Typography>
                <Typography color={"textSecondary"}>Bsp.: Frühling "or" Sonne "and" Liebe</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte, die mindestens eins der Worte "Frühling" oder "Sonne" und "Liebe" (die letzten beiden gleichzeitig, falls das erste nicht enthalten ist) enthalten.</Typography>
              </li>
              <li>
                <Typography>Schließen Sie Phrasen mit <b>"not"</b> von der Suche aus. Achtung: "not" soll immer am Ende der Eingabe (ggf. nach "or" oder "and") stehen.</Typography>
                <Typography color={"textSecondary"}>Bsp.: Frühling "or" Sonne "not" Liebe</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte, die mindestens eins der Wörter "Frühling" oder "Sonne" und gleichzeitig nicht das Wort "Liebe" enthält</Typography>
              </li>
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

ContainsInput.propTypes = {
  classes: PropTypes.object.isRequired,
  cardId: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleBrowserChange: PropTypes.func.isRequired,
};

const styles = theme => ({
  root:{
    flexGrow: 1,
    paddingTop: 5,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    position: 'relative',
  },
  textField:{
    //marginTop: theme.spacing.unit,
  },
  listWrapper:{
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 4,
    marginTop: -3 * theme.spacing.unit,
    minWidth: 400,
  },
  dialogHeader:{
    marginLeft: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit,
  },
  listHeader:{
    marginLeft: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
  },
  dialogWrapper:{
    minWidth: 600,
  },
  errorMessage:{
    fontSize: '0.75rem',
  }
});

export default withStyles(styles)(ContainsInput);