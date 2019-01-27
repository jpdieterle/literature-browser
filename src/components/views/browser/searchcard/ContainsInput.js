import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

//TODO: regex (oÄ) unterstützen
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
    let string = this.state.keywords;

    // check if quotes have been closed
    let quotes = 0;
    for(let i=0; i<string.length; i++) {
      if(string.charAt(i) === '"') quotes++;
    }
    if(quotes % 2 !== 0) {
      error = true;
      errorMessage += 'Bitte schließen Sie die Anführungszeichen. ';
    }

    // check if semicolons have been used instead of commas
    if(string.search(';') >= 0) {
      error = true;
      errorMessage += 'Bitte verwenden Sie Kommas statt Semikolons. '
    }

    this.setState({
      syntaxError: error,
      errorMessage: errorMessage,
    }, () => {
      this.props.handleBrowserChange('keywordError', error);
    });
  };

  render() {
    const { classes, variant, disabled } = this.props;
    const { keywords } = this.state;

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
          error={this.state.syntaxError}
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
              <li>
                <Typography>Geben Sie einzelne Wörter oder Phrasen in <b>Anführungszeichen</b> (") an.</Typography>
                <Typography color={"textSecondary"}>Bsp.: "Frühling"</Typography>
              </li>
              <li>
                <Typography>Wenn Sie Phrasen suchen, die mit einem bestimmten Wort anfangen, kennzeichnen Sie dies mit einem <b>Stern</b> (*).</Typography>
                <Typography color={"textSecondary"}>Bsp.: "Frühling*" trifft auf Frühling zu, aber auch auf Frühlingsgefühle.</Typography>
              </li>
              <li>
                <Typography>Verbinde Sie Phrasen durch ein <b>Komma</b>.</Typography>
                <Typography color={"textSecondary"}>Bsp.: "Frühling", "Sonne"</Typography>
                <Typography color={"textSecondary"}>Ergebnis: Texte, die die Worte "Frühling" und "Sonne" gleichzeitig enthalten.</Typography>
              </li>
              <li>
                <Typography>Geben Sie alternative Phrasen an oder schließen Sie Phrasen von der Suche aus:</Typography>
                <ul>
                  <li>
                    <Typography><b>OR</b>: Es wird nach Texten gesucht, die mindestens eine der beiden Phrasen enthalten.</Typography>
                  </li>
                  <li>
                    <Typography><b>NOT</b>: Es wird nach Texten gesucht, die die nachfolgende Phrase nicht enthalten</Typography>
                  </li>
                  <Typography color={"textSecondary"}>Bsp.: "Frühling" AND "Blume", NOT "Baum", "Liebe", "Sonne*" OR "Regen" OR "Gewitter"</Typography>
                  <Typography color={"textSecondary"}>Ergebnis: Es wird nach Texten gesucht, die entweder "Frühling" oder "Blume" enthalten,
                  gleichzeitig nicht das Wort "Baum" enthalten, aber "Liebe" enthalten und gleichzeitig entweder Wörter,
                    die mit "Sonne" beginnen, oder "Regen" oder "Gewitter".</Typography>
                </ul>
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