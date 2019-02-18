import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import theme from './theme/theme'
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import NotificationContext from './components/notifications/NotificationContext';
import Header from './components/views/navigation/Header';
import Login from './components/views/login/Login';
import Browser from './components/views/browser/Browser';
import About from './components/views/About';
import Admin from './components/views/admin/Admin';
import MissingPage from './components/views/MissingPage';
import ErrorSnackbar from './components/notifications/NotificationSnackbar';

const exampleAuthors = ['Goethe, Johann Wolfgang',
  'Schiller, Friedrich',
  'Rilke, Rainer Maria',
  'Spitteler, Carl',
  'Dauthendey, Max',
  'Grün, Anastasius',
  'Lessing, Gotthold Ephraim'];

const genres = [
  'ballad',
  'poem',
  'sonnet',
];

// App component
class App extends React.Component {
  state = {
    loggedIn: true,
    sessionID: localStorage.getItem('sessionID'),
    isAdmin: true,
    timeRange: {
      minYear: localStorage.getItem('minYear') || '1700',
      maxYear: localStorage.getItem('maxYear') || '1950',
    },
    authors: localStorage.getItem('authors') || exampleAuthors,
    genres: localStorage.getItem('genres') || genres,
    notification: {
      show: false,
      statusCode: 0,
      message: 'notification',
      action: '',
      variant: 'error',
    }
  };

  // set state of App component
  handleStateChange = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  // open/close notification snackbar, display message (depending on optional statusCode and variant)
  handleNotificationChange = (show, message, action, variant, statusCode, ) => {
    console.log('error? ', this.state.error);
    this.handleStateChange('notification', {
      show: show,
      statusCode: statusCode? statusCode : 0,
      message: message? message : '',
      action: action,
      variant: variant? variant : 'error',
    });
  };

  // request authors list
  requestAuthors = () => {
    fetch("/backend/lib/functions.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({authors: true})
    }).then(response => {
        if(response.ok) {
          response.json().then(data => {
            console.log('authorData: ', JSON.parse(data.authors));
            if(data && data.status === 'success' && data.authors) {
              this.handleStateChange('authors', JSON.parse(data.authors));
              localStorage.setItem('authors', JSON.parse(data.authors));
            } else {
              // server error
              this.handleNotificationChange(true, 'Autoren/Genres/Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
            }
          });
        } else {
          this.handleNotificationChange(true, 'Autoren/Genres/Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
        }
      }
    ).catch(error => {
        this.handleNotificationChange(true, 'Autoren/Genres/Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error', 404);
      }
    );
  };

  // request genres + time range
  requestLog = () => {
    fetch("/backend/lib/functions.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({log: true})
    }).then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success' && data.genres && data.minYear && data.maxYear) {
              this.handleStateChange('genres', data.genres);
              this.handleStateChange('timeRange', {minYear: data.minYear, maxYear: data.maxYear});
              localStorage.setItem('genres', data.genres);
              localStorage.setItem('minYear', data.minYear);
              localStorage.setItem('maxYear', data.maxYear);
            } else {
              this.handleNotificationChange(true, 'Autoren/Genres/Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
            }
          });
        } else {
          this.handleNotificationChange(true, 'Autoren/Genres/Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
        }
      }
    ).catch(error => {
        this.handleNotificationChange(true, 'Autoren/Genres/Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error', 404);
      }
    );
  };

  // check if user is logged in (valid session id) and if he is an admin
  requestUserStatus = () => {
    // check if there was a session in the past
    if(!localStorage.getItem('sessionID')) {
      return;
    }

    fetch("/backend/lib/functions.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
        id: localStorage.getItem('sessionID')
      })
    }).then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.loggedIn && data.isadmin !== undefined) {
              this.handleStateChange('loggedIn', data.loggedIn);
              this.handleStateChange('isAdmin', data.isadmin);
              this.handleStateChange('sessionID', localStorage.getItem('sessionID'));
            } else {
              this.handleNotificationChange(true, 'Sitzung konnte nicht wiederhergestellt werden.', 'initialLoad', 'error');
              localStorage.removeItem('sessionID');
            }
          });
        } else {
          this.handleNotificationChange(true, 'Sitzung konnte nicht wiederhergestellt werden.', 'initialLoad', 'error');
          localStorage.removeItem('sessionID');
          this.handleStateChange('loggedIn', false);
          this.handleStateChange('isAdmin', false);
        }
      }
    ).catch(error => {
        this.handleNotificationChange(true, 'Sitzung konnte nicht wiederhergestellt werden.', 'initialLoad', 'error', 404);
        localStorage.removeItem('sessionID');
        this.handleStateChange('loggedIn', false);
        this.handleStateChange('isAdmin', false);
      }
    );
  };

  // executed after component is inserted into the tree
  componentDidMount = () => {
    // request initial data (authors, genres, time range, user status
    this.requestAuthors();
    this.requestLog();

    // check if user is still logged in
    this.requestUserStatus();
    console.log('initial app state: ', this.state.authorsList, this.state.timeRange, this.state.genres, this.state.loggedIn, this.state.isAdmin);
  };

  // logout user, request server to delete sessionID, display error if necessary
  logout = () => {
    fetch('/backend/lib/functions.php', {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({logout: true})
    })
      .then(response => {
        if(response.ok && response.json().status === 'success') {
          this.handleNotificationChange(true, 'Logout erfolgreich', 'logout', 'success');
        } else {
          this.handleNotificationChange(true, 'Logout auf dem Server fehlgeshlagen.', 'logout', 'error', response.statusCode);
        }
        this.setState({
          loggedIn: false,
          isAdmin: false,
        });
        localStorage.clear();
      })
      .catch(error => {
        this.handleNotificationChange(true, error.message, 'logout', 'error', 404);
        this.setState({
          loggedIn: false,
          isAdmin: false,
        });
        localStorage.clear();
      });
  };

  render() {
    const { classes } = this.props;
    const { loggedIn, isAdmin, authors, timeRange, notification, genres, sessionID } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <NotificationContext.Provider
          value={{
            error: notification.show,
            message: notification.message,
            statusCode: notification.statusCode,
            action: notification.action,
            variant: notification.variant,
            handleNotificationChange: this.handleNotificationChange,
          }}
        >
          <div className={classes.root}>
            <Router>
              <div>
                <Header loggedIn={loggedIn} isAdmin={isAdmin} logout={this.logout}/>
                <div className={classes.contentWrapper}>
                  <Switch>
                    <Route exact path='/' render={() => (
                      loggedIn? (<Browser sessionID={sessionID} authorsList={authors} minYear={timeRange.minYear} maxYear={timeRange.maxYear} genres={genres}/>) :
                        (<Redirect to='/login'/>)
                    )}/>
                    <Route path='/about' component={About}/>
                    <Route path='/admin' render={() => (
                      (loggedIn && isAdmin)? (<Admin requestNewAuthors={this.requestAuthors} requestNewLog={this.requestLog}/>) : (<Redirect to='/' />)
                    )}/>
                    <Route path='/login' render={() => (
                      loggedIn? (<Redirect to='/'/>) : (<Login handleAppStateChange={this.handleStateChange} />)
                    )}/>

                    <Route component={MissingPage}/>
                  </Switch>
                </div>
                <ErrorSnackbar />
              </div>
            </Router>
          </div>
        </NotificationContext.Provider>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  root: {
    height: '100%',
  },
  contentWrapper: {
    height: '100%',
    paddingTop: 32,
  },
  routerWrapper: {
    height: '100%',
  },
};

export default withStyles(styles)(App);
