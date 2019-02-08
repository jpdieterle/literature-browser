import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from '../browser/results/ErrorMessage';

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
    emailError: true,
    passwordError: true,
    eErrorMessage: '',
    pErrorMessage: '',
    statusCode: 0,
    loginError: false,
    errorMessage: '',
    loading: false,
  };

  onInputChange = (event) => {
    this.setState({[event.target.type]: event.target.value});
  };

  handleSubmit = () => {
    this.setState({loading: true});
    // TODO: send request to server to get cookie + status (isAdmin?)
    fetch(this.props.url,{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({login: true}),
    })
      .then(response => {
        if (response.ok) {
          response.json().then(responseJson => {
            // TODO: read user status (isAdmin)

            // TODO: set app state (user state, logged in)
            this.props.handleAppStateChange('loggedIn', true);
            this.props.handleAppStateChange('isAdmin', responseJson.admin);
          })
        } else {
          // TODO: set errormessage, set error: true
          this.setState({
            loginError: true,
            errorMessage: '',
          });
        }
      })
      .catch(error => {

      });

    this.setState({loading: false});
  };

  render() {
    const {classes, setAuth } = this.props;
    const { email, password, emailError, passwordError, loginError, loading } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.infoBox}>
          <InfoIcon color={"primary"} className={classes.infoIcon}/>
          <Typography color={"primary"}>
            Falls Sie sich registrieren möchten, Ihr Passwort vergessen haben
            oder Ihr Nutzerkonto löschen möchten wenden Sie sich bitte an den/die Administrator/in.
          </Typography>
        </Paper>
        <Paper className={classes.loginContainer}>
          <div className={classes.formContainer}>
            <Typography variant={'h6'} color={'primary'}>Bitte melden Sie sich an</Typography>
            <TextField
              className={classes.textField}
              label={'E-Mail'}
              type={'email'}
              value={email}
              onChange={this.onInputChange}
            />
            {<Typography color={'error'} className={classes.errorMessage}>{this.state.errorMessage}</Typography>}
            <TextField
              className={classes.textField}
              label={'Passwort'}
              type={'password'}
              value={password}
              onChange={this.onInputChange}
            />
            <div className={classes.flexContainer}>
              <Button
                size="small"
                color="primary"
                variant={"contained"}
                className={classes.button}
                onClick={this.handleSubmit}
              >
                Anmelden
              </Button>
              {loading && <CircularProgress className={classes.loadingAnimation} size={30}/>}
            </div>
            {!this.state.loading && this.state.loginError && <ErrorMessage component='login' statusCode={this.state.statusCode} />}
          </div>
        </Paper>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string,
  handleAppStateChange: PropTypes.func,
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
    marginRight: theme.spacing.unit * 2,
    width: 100,
  },
  infoBox:{
    width: 400 + theme.spacing.unit * 6,
    padding: theme.spacing.unit*2,
    paddingRight: theme.spacing.unit * 4,
    display: 'flex',
    margin: 'auto',
    marginBottom: theme.spacing.unit * 3,
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
  flexContainer:{
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default withStyles(styles)(Login);