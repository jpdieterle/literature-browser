import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fileDownload from 'js-file-download';
import InfoIcon from '@material-ui/icons/Info';

class Login extends React.Component {
  state = {};

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.infoBox}>
          <InfoIcon color={"primary"} className={classes.infoIcon}/>
          <Typography color={"primary"}>
            Falls Sie sich registrieren möchten, ihr Passwort vergessen haben
            oder ihr Nutzerkonto löschen möchten wenden Sie sich bitte an den/die Administrator/in.
          </Typography>
        </Paper>
        <Paper className={classes.loginContainer}>
          <div className={classes.formContainer}>
            <Typography variant={'h6'} color={'primary'}>Bitte melden Sie sich an</Typography>
            <TextField
              className={classes.textField}
              label={'E-Mail'}
            />
            <TextField
              className={classes.textField}
              label={'Passwort'}
            />
            <Button
              size="small"
              color="primary"
              variant={"contained"}
              className={classes.button}
            >
              Anmelden
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.any.isRequired,
  numberOfResults: PropTypes.number,
};

const styles = theme => ({
  root: {},
  loginContainer:{
    width: 400,
    padding: theme.spacing.unit * 6,
    margin: 'auto',
  },
  formContainer:{
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
  },
  button:{
    marginTop: theme.spacing.unit * 5,
    width: 100,
  },
  infoBox:{
    width: 400 + theme.spacing.unit * 6,
    padding: theme.spacing.unit*2,
    paddingRight: theme.spacing.unit * 4,
    display: 'flex',
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 3,
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles)(Login);