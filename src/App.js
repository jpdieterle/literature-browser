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
import Wiki from './components/views/Wiki';
import About from './components/views/About';
import Admin from './components/views/admin/Admin';
import MissingPage from './components/views/MissingPage';
import ErrorSnackbar from './components/notifications/NotificationSnackbar';

// TODO: add authors list as file that persists reload! => set initial state (before loading authors)
const exampleAuthors = ['Goethe, Johann Wolfgang',
  'Schiller, Friedrich',
  'Rilke, Rainer Maria',
  'Spitteler, Carl',
  'Dauthendey, Max',
  'Grün, Anastasius',
  'Lessing, Gotthold Ephraim'];

// TODO: add genres list as file
const genres = [
  'ballad',
  'poem',
  'sonnet',
];

// App component
class App extends React.Component {
  state = {
    loggedIn: true,
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
            this.handleStateChange('authors', data.authors);
            localStorage.setItem('authors', data.authors);
          });
        } else {
          this.handleNotificationChange(true, 'Autoren konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
        }
      }
    ).catch(error => {
        this.handleNotificationChange(true, 'Autoren konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
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
            this.handleStateChange('genres', data.genres);
            this.handleStateChange('timeRange', {minYear: data.minYear, maxYear: data.maxYear});
            localStorage.setItem('genres', data.genres);
            localStorage.setItem('minYear', data.minYear);
            localStorage.setItem('maxYear', data.maxYear);
          });
        } else {
          this.handleNotificationChange(true, 'Genres und Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
        }
      }
    ).catch(error => {
        this.handleNotificationChange(true, 'Genres und Zeitspanne konnten nicht vom Server geladen werden.', 'initialLoad', 'error');
      }
    );
  };

  // check if user is logged in (valid session id) and if he is an admin
  requestUserStatus = () => {
    fetch("/backend/lib/functions.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status: true})
    }).then(response => {
        if(response.ok) {
          response.json().then(data => {
            this.handleStateChange('loggedIn', data.loggedIn);
            this.handleStateChange('isAdmin', data.isadmin);
          });
        } else {
          this.handleNotificationChange(true, 'Sitzung konnte nicht wiederhergestellt werden.', 'initialLoad', 'error');
          this.handleStateChange('loggedIn', false);
          this.handleStateChange('isAdmin', false);
        }
      }
    ).catch(error => {
        this.handleNotificationChange(true, 'Sitzung konnte nicht wiederhergestellt werden.', 'initialLoad', 'error');
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
        if(!response.ok) {
          this.handleNotificationChange(true, response.statusText, 'logout', 'error', response.statusCode);
          // TODO: delete cookie locally + set state
        }
        this.setState({
          loggedIn: false,
          isAdmin: false,
        });
        localStorage.clear();
      })
      .catch(error => {
        this.handleNotificationChange(true, error.message, 'logout');
        // TODO: delete cookie locally
        this.setState({
          loggedIn: false,
          isAdmin: false,
        });
        localStorage.clear();
      });
  };

  render() {
    const { classes } = this.props;
    const { loggedIn, isAdmin, authors, timeRange, notification, genres } = this.state;

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
                      loggedIn? (<Browser authorsList={authors} minYear={timeRange.minYear} maxYear={timeRange.maxYear} genres={genres}/>) :
                        (<Redirect to='/login'/>)
                    )}/>
                    <Route path='/wiki' component={Wiki}/>
                    <Route path='/about' component={About}/>
                    <Route path='/admin' render={() => (
                      (loggedIn && isAdmin)? (<Admin />) : (<Redirect to='/' />)
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
