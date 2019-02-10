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
import ErrorContext from './components/error/ErrorContext';
import Header from './components/views/navigation/Header';
import Login from './components/views/login/Login';
import Browser from './components/views/browser/Browser';
import Wiki from './components/views/Wiki';
import About from './components/views/About';
import Admin from './components/views/admin/Admin';
import MissingPage from './components/views/MissingPage';
import ErrorSnackbar from './components/error/ErrorSnackbar';

// TODO: add authors list as file that persists reload! => set initial state (before loading authors)
const exampleAuthors = ['Goethe, Johann Wolfgang',
  'Schiller, Friedrich',
  'Rilke, Rainer Maria',
  'Spitteler, Carl',
  'Dauthendey, Max',
  'Grün, Anastasius',
  'Lessing, Gotthold Ephraim'];

// App component
class App extends React.Component {
  state = {
    loggedIn: true,
    isAdmin: true,
    minYear: '1700',
    maxYear: '1950',
    authorsList: exampleAuthors,
    error: true,
    errorCode: 0,
    errorMessage: 'Blabla',
  };

  requestURL = '';

  // set state of App component
  handleStateChange = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  // open/close error snackbar, display message (depending on optional errorCode)
  onErrorChange = (isError, message, errorCode) => {
    this.setState({
      error: isError,
      message: message,
      errorCode: errorCode,
    })
  };

  // executed after component is inserted into the tree
  componentDidMount = () => {
    // TODO: send request -> check if sessionID in cookie is still valid, get minYear + maxYear, get author list
    // TODO: set App state with response values
  };

  // logout user, request server to delete sessionID, display error if necessary
  logout = () => {
    // TODO: reset cookie! -> request to backend
    fetch('', {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({logout: true})
    })
      .then(response => {
        if(response.ok) {
          this.setState({
            loggedIn: false,
            isAdmin: false,
          })
        } else {
          this.setState({
            error: true,
            errorMessage: response.statusText,
          })
        }
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMessage: error.message,
        })
      });
  };

  render() {
    const { classes } = this.props;
    const { loggedIn, isAdmin, authorsList, minYear, maxYear, error, errorMessage } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <ErrorContext.Provider value={{onErrorChange: this.onErrorChange}}>
          <div className={classes.root}>
            <Router>
              <div>
                <Header loggedIn={loggedIn} isAdmin={isAdmin} logout={this.logout}/>
                <div className={classes.contentWrapper}>
                  <Switch>
                    <Route exact path='/' render={() => (
                      loggedIn? (<Browser authorsList={authorsList} minYear={minYear} maxYear={maxYear}/>) :
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
                <ErrorSnackbar
                  message={errorMessage}
                  open={error}
                />
              </div>
            </Router>
          </div>
        </ErrorContext.Provider>
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
