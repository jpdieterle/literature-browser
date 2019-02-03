import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import theme from './theme/theme'
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from "./components/views/navigation/Header";
import Login from './components/views/login/Login';
import Browser from './components/views/browser/Browser';
import Wiki from './components/views/Wiki';
import About from './components/views/About';
import Admin from './components/views/admin/Admin'

const fakeAuthentication = {
  authenticated: false,
  authenticate(callback) {
    console.log('authenticating...');
    this.authenticated = true;
    setTimeout(callback, 100); // fake login
    console.log('authenticated? ', this.authenticated)
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const setAuthTrue = (callback) => {
  console.log('setting auth true...');
  fakeAuthentication.authenticate(callback);
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthentication.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )}/>
);

const LoginWithProps = (props) => (
  <Login setAuth={setAuthTrue} />
);

// TODO: logout
// TODO: remove cookie!

class App extends React.Component {
  state = {
    loggedIn: false,
    userStatus: 'normal',
    minYear: 1700,
    maxYear: 1950,
    authors: {},
  };

  requestURL = '';

  componentWillMount = () => {
    // TODO: send request -> check if sessionID in cookie is still valid i.e. if user should still be logged in
    // TODO: send request -> get minYear + maxYear
    // TODO: send request -> get author list
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Router>
            <div>
              <Header />
              <div className={classes.contentWrapper}>
                <Route exact path='/' component={Browser}/>
                <Route path='/wiki' component={Wiki}/>
                <Route path='/about' component={About}/>
                <PrivateRoute path='/admin' component={Admin}/>
                <Route path='/login' component={LoginWithProps}/>
              </div>
            </div>
          </Router>
        </div>
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
