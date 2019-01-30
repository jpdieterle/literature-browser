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
import Browser from './components/views/browser/Browser';
import Wiki from './components/views/Wiki';
import About from './components/views/About';
import Login from './components/views/login/Login';
import Admin from './components/views/admin/Admin'

const fakeAuthentication = {
  isAuthenticated: true,
  authenticated(callback) {
    this.authenticated = true;
    setTimeout(callback, 100); // fake login
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthentication.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )}/>
);

class App extends React.Component {

  render() {
    console.log('rendering app');
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Router>
            <div>
              <Header/>
              <Route path='/login' component={Login}/>
              <PrivateRoute path='/admin' component={Admin}/>
              <PrivateRoute path='/browser' component={Browser}/>
              <Route path='/wiki' component={Wiki}/>
              <Route path='/about' component={About}/>
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
    backgroundColor: '#fcfcfc',
  }
};

export default withStyles(styles)(App);
