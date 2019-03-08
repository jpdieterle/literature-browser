import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NotificationContext from '../../../notifications/NotificationContext';
import InfoCard from '../../../InfoCard';
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class UserManagement extends React.Component {
  componentDidMount = () => {
    // load user list
    this.requestUsers();
  };

  state = {
    loading: false,
    users: [{user: 'exampleUser', isAdmin: true}],
    isOpen: false,
    newUser: {
      name: '',
      pw1: '',
      pw2: '',
      isAdmin: false,
    }
  };

  handleChange = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  handleUserChange = (event) => {
    let newUser = this.state.newUser;
    let name = event.target.name;
    newUser[name] = name === 'isAdmin'? event.target.checked : event.target.value;
    this.handleChange('newUser', newUser);
  };

  // check how many admins are in the users list
  getAdminNumber = users => users.filter(user => user.isAdmin).length;

  // check username min length of 3 characters and max length of 30 characters
  checkUsernameLength = username => username.length > 2 && username.length < 31;

  // compare passwords (before sending)
  comparePasswords = (pw1, pw2) => {
    return pw1 === pw2;
  };

  // Is password long enough?
  checkPasswordLength = password => password.length < 41 && password.length > 3;

  // request users list from server
  requestUsers = () => {
    this.handleChange('loading', true);
    fetch('/backend/lib/admin.php',{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: true,
        id: this.props.sessionID
      }),
    })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success') {
              // received users list from server
              this.handleChange('users', JSON.parse(data.users));
            } else {
              this.context.handleNotificationChange(true, 'Die Nutzerliste konnte nicht geladen werden.', 'loadUsers', 'error');
            }
          })
        } else {
          this.context.handleNotificationChange(true, 'Die Nutzerliste konnte nicht geladen werden.', 'loadUsers', 'error');
        }
        this.handleChange('loading', false);
      })
      .catch(error => {
        this.context.handleNotificationChange(true, 'Die Nutzerliste konnte nicht geladen werden.', 'loadUsers', 'error');
        this.handleChange('loading', false);
      });
  };

  // create new user on server
  requestNewUser = () => {
    // check inputs before sending request
    if(!this.checkUsernameLength(this.state.newUser.name)
      || !this.checkPasswordLength(this.state.newUser.pw1) || !this.checkPasswordLength(this.state.newUser.pw2)
      || !this.comparePasswords(this.state.newUser.pw1, this.state.newUser.pw2)
    ) {
      this.context.handleNotificationChange(true, 'Bitte geben Sie gültige Nutzerdaten ein.', 'newUser', 'error');
      return;
    }
    this.handleChange('loading', true);
    fetch('/backend/lib/admin.php',{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.newUser.name,
        password: this.state.newUser.pw1,
        isadmin: this.state.newUser.isAdmin === false? 0 : 1,
        id: this.props.sessionID
      }),
    })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success') {
              // created new user
              this.requestUsers();
              this.context.handleNotificationChange(true, 'Benutzer*in erfolgreich angelegt.', 'createUser', 'success');
            } else {
              this.context.handleNotificationChange(true, 'Benutzer*in konnte nicht angelegt werden.', 'createUser', 'error');
            }
          })
        } else {
          this.context.handleNotificationChange(true, 'Benutzer*in konnte nicht angelegt werden.', 'createUser', 'error');
        }
        this.handleChange('loading', false);
      })
      .catch(error => {
        this.context.handleNotificationChange(true, 'Benutzer*in konnte nicht angelegt werden.', 'createUser', 'error');
        this.handleChange('loading', false);
      });
  };

  // delete user from server
  requestDelete = username => {
    if(!username) return;
    if(this.state.users.filter(user => user.user === username)[0].isAdmin && this.getAdminNumber(this.state.users) === 1) {
      this.context.handleNotificationChange(true, 'Legen Sie einen neuen Admin-Account an bevor Sie den einzigen löschen.', 'deleteUser', 'error');
      return;
    }
    fetch('/backend/lib/admin.php', {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delete: username,
        id: this.props.sessionID,
      })
    })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data.status === 'success') {
              this.requestUsers();
              this.context.handleNotificationChange(true, 'Nutzer*in erfolgreich gelöscht.', 'deleteUser', 'success')
            } else {
              this.context.handleNotificationChange(true, 'Nutzer*in konnte nicht gelöscht werden.', 'deleteUser', 'error')
            }
          })
        } else {
          this.context.handleNotificationChange(true, 'Nutzer*in konnte nicht gelöscht werden.', 'deleteUser', 'error')
        }
      })
      .catch(error => {
          this.context.handleNotificationChange(true, 'Nutzer*in konnte nicht gelöscht werden.', 'deleteUser', 'error')
        }
      );
  };

  render() {
    const { classes } = this.props;
    const {  loading, newUser, users } = this.state;

    return (
        <div>
          <InfoCard message={'Hier können Sie Nutzer*innen hinzufügen und entfernen.'}/>
          <div className={classes.marginLeftContainer}>
            <Typography variant={'h6'} color={'primary'}>Registrierte Nutzer*innen</Typography>
            <Paper className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell scope={'column'}>Nr.</TableCell>
                    <TableCell scope={'column'}>Username</TableCell>
                    <TableCell scope={'column'}>Admin</TableCell>
                    <TableCell scope={'column'}>Aktion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user.user}>
                      <TableCell scope={'row'}>{index + 1}</TableCell>
                      <TableCell>{user.user}</TableCell>
                      <TableCell>{user.isadmin? 'Ja' : 'Nein'}</TableCell>
                      <TableCell className={classes.flexContainer}>
                        <IconButton onClick={() => this.requestDelete(user.user)}><DeleteIcon color={'secondary'}/></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
          <br/>
          <div className={classes.marginLeftContainer}>
            <Typography variant={'h6'} color={'primary'}>Nutzer*in hinzufügen</Typography>
            <Paper className={classes.loginContainer}>
              <div className={classes.formContainer}>
                <Typography color={'primary'}>Bitte geben Sie Nutzerdaten ein:</Typography>
                <TextField
                  disabled={loading}
                  autoFocus={true}
                  className={classes.textField}
                  label={'Benutzername'}
                  type={'text'}
                  value={newUser.name}
                  error={!loading && newUser.name !== '' && !this.checkUsernameLength(newUser.name)}
                  name={'name'}
                  onChange={this.handleUserChange}
                />
                {!loading && newUser.name !== '' && !this.checkUsernameLength(newUser.name) && <Typography color={'error'} className={classes.errorMessage}>
                  Geben Sie mindestens 3 und höchstens 30 Zeichen ein.
                </Typography>}
                <TextField
                  className={classes.textField}
                  disabled={loading}
                  label={'Passwort'}
                  type={'password'}
                  name={'pw1'}
                  value={newUser.pw1}
                  error={!loading && newUser.pw1 !== '' && !this.checkPasswordLength(newUser.pw1)}
                  onChange={this.handleUserChange}
                />
                {!loading && newUser.pw1 !== '' && !this.checkPasswordLength(newUser.pw1) && <Typography color={'error'} className={classes.errorMessage}>
                  Das Passwort muss mindestens 4 und höchstens 40 Zeichen lang sein.
                </Typography>}
                <TextField
                  className={classes.textField}
                  disabled={loading}
                  label={'Passwort wiederholen'}
                  type={'password'}
                  name={'pw2'}
                  value={newUser.pw2}
                  error={!loading && newUser.pw1 !== '' && !this.comparePasswords(newUser.pw1, newUser.pw2)}
                  onChange={this.handleUserChange}
                />
                {!loading && !this.comparePasswords(newUser.pw1, newUser.pw2) && <Typography color={'error'} className={classes.errorMessage}>
                  Die Passwörter stimmen nicht überein.
                </Typography>}
                <FormControlLabel
                  control={
                  <Checkbox
                    checked={newUser.isAdmin}
                    onChange={this.handleUserChange}
                    name={'isAdmin'}
                  />
                  }
                  label={'Admin'}/>
                <div className={classes.flexContainer}>
                  <Button
                    disabled={loading}
                    size="small"
                    color="primary"
                    variant={"contained"}
                    className={classes.button}
                    onClick={this.requestNewUser}
                  >
                    Hinzufügen
                  </Button>
                </div>
              </div>
            </Paper>
          </div>
          <br/>
        </div>
    );
  }
}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  sessionID: PropTypes.any.isRequired,
};

UserManagement.contextType = NotificationContext;

const styles = theme => ({

  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: theme.spacing.unit,
    marginRight: '20px',
    width: 896,
  },
  marginLeftContainer: {
    marginLeft: theme.spacing.unit,
  },
  table: {
    minWidth: 400,
    maxWidth: 800,
    marginLeft: theme.spacing.unit,
  },
  newUser:{
    padding: '20px',
    marginTop: '20px'
  },
  nutzerpaper: {
    marginTop:'10px',
    marginRight: '20px',
  },
  nutzerBox: {
    padding: 5,
    display: 'flex',
  },
  tableWrapper: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginRight: '20px',
    width: 896,
  },
  loginContainer:{
    width: 400,
    padding: theme.spacing.unit * 6,
    marginTop: theme.spacing.unit * 2
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
    width: 110,
    padding: theme.spacing.unit,
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

export default withStyles(styles)(UserManagement);

