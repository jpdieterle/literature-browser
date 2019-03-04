import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InfoIcon from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationContext from "../../notifications/NotificationContext";

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false,
  };

  onInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  // send request to server + change app state or display error
  requestLogin = () => {
    this.setState({
      loading: true,
      error: false,
    });
    fetch('/backend/lib/sessionManagement.php',{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: true,
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(response => {
        this.setState({statusCode: response.status});
        if (response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success' && data.isadmin) {
              this.props.handleAppStateChange('loggedIn', true);
              this.props.handleAppStateChange('isAdmin', data.isadmin !== 0);
              this.props.handleAppStateChange('sessionID', data.id);

              //save session ID in local storage (stays after reload)
              localStorage.setItem('sessionID', data.id);
              this.context.handleNotificationChange(true, 'Login erfolgreich.', 'login', 'success');
            } else {
              // server error
              this.context.handleNotificationChange(true, 'Es ist ein Fehler beim Login aufgetreten.', 'login', 'error', data.error);
            }
          });
        } else {
          this.setState({
            loginError: true,
            errorMessage: response.statusText,
          });
          this.context.handleNotificationChange(true, response.statusText, 'login', 'error', response.statusCode);
        }
      })
      .catch(error => {
        this.setState({
          loginError: true,
          errorMessage: error.message,
        });
        this.context.handleNotificationChange(true, error.message, 'login', 'error', 404);
      });
    this.setState({loading: false});
  };

  render() {
    const {classes } = this.props;
    const { username, password, loading } = this.state;

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
              label={'Benutzername'}
              type={'text'}
              name={'username'}
              value={username}
              onChange={this.onInputChange}
            />
            <TextField
              className={classes.textField}
              disabled={loading}
              label={'Passwort'}
              type={'password'}
              name={'password'}
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
                onClick={this.requestLogin}
              >
                Anmelden
              </Button>
              {loading && <CircularProgress className={classes.loadingAnimation} size={30}/>}
            </div>
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

Login.contextType = NotificationContext;

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