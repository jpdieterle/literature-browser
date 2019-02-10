import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InfoIcon from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorMessage from '../browser/results/ErrorMessage';
import ErrorContext from "../../error/ErrorContext";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    emailError: true,
    statusCode: 0,
    loginError: false,
    errorMessage: '',
    loading: false,
  };

  onInputChange = (event) => {
    this.setState({[event.target.type]: event.target.value});
    if(event.target.type === 'email') {
      this.setState({
        emailError: !this.checkEmail(event.target.value)
      })
    }
  };

  // check if format is [string]@[string].[string]
  checkEmail = email => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  handleSubmit = () => {
    let message = this.state.emailError? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' : '';
    message += (this.state.password.length < 5)? 'Das Passwort muss mindestens 5 Zeichen haben.' : '';
    if(message !== '') {
      this.setState({
        loginError: true,
        errorMessage: message
      });
      return;
    }

    this.setState({
      loading: true,
      error: false,
    });
    fetch(this.props.url,{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    })
      .then(response => {
        this.setState({statusCode: response.status});
        if (response.ok) {
          response.json().then(responseJson => {
            this.props.handleAppStateChange('loggedIn', true);
            this.props.handleAppStateChange('isAdmin', responseJson.isAdmin);
          })
        } else {
          this.setState({
            loginError: true,
            errorMessage: response.statusText,
          });
          this.context.onErrorChange(true, response.statusText)
        }
      })
      .catch(error => {
        this.setState({
          loginError: true,
          errorMessage: error.message,
        });
      });

    this.setState({loading: false});
  };

  render() {
    const {classes } = this.props;
    const { email, password, emailError, loading, statusCode, errorMessage } = this.state;

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
              disabled={loading}
              autoFocus={true}
              className={classes.textField}
              label={'E-Mail'}
              type={'email'}
              value={email}
              error={!loading && emailError}
              onChange={this.onInputChange}
            />
            {!loading && emailError && <Typography color={'error'} className={classes.errorMessage}>
              Geben Sie eine gültige E-Mail-Adresse ein.
            </Typography>}
            <TextField
              className={classes.textField}
              disabled={loading}
              label={'Passwort'}
              type={'password'}
              value={password}
              onChange={this.onInputChange}
            />
            <div className={classes.flexContainer}>
              <Button
                disabled={loading}
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
            {!this.state.loading && this.state.loginError && (Math.floor(statusCode/100) !== 2) &&
            <div className={classes.loginErrorMessage}>
              <ErrorMessage component='login' statusCode={statusCode} errorMessage={errorMessage} />
            </div>}
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

Login.contextType = ErrorContext;

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
  loginErrorMessage:{
    marginLeft: -theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    width: theme.spacing.unit * 52,
  },
});

export default withStyles(styles)(Login);