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
    dialogOpen: true,
  };

  onInputChange = (event) => {
    this.setState({keywords: event.target.value,}, () => {
      this.props.onInputChange(this.props.cardId, 'keywords', this.state.keywords); // update SearchCard
    });
  };

  onOpenDialog = () => {
    this.setState({dialogOpen: true})
  };

  onCloseDialog = () => {
    this.setState({dialogOpen: false})
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
          value={keywords}
          onChange={this.onInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.onOpenDialog}>
                  <InfoIcon />
                </IconButton>
              </InputAdornment>)}}
        />
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
});

export default withStyles(styles)(ContainsInput);