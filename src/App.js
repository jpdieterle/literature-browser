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

// redirects Admin and Browser to Login page if user is not logged in
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    this.state.loggedIn === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )}/>
);

// TODO: real login
// TODO: logout
// TODO: remove cookie!

// App component
class App extends React.Component {
  state = {
    loggedIn: true,
    isAdmin: false,
    minYear: 1700,
    maxYear: 1950,
    authorsList: ['Goethe, Johann Wolfgang',
      'Schiller, Friedrich',
      'Rilke, Rainer Maria',
      'Spitteler, Carl',
      'Dauthendey, Max',
      'Grün, Anastasius',
      'Lessing, Gotthold Ephraim'],
  };

  requestURL = '';

  // set state of App component
  handleStateChange = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  // executed when component finished rendering
  componentDidMount = () => {
    // TODO: send request -> check if sessionID in cookie is still valid i.e. if user should still be logged in
    // TODO: send request -> get minYear + maxYear
    // TODO: send request -> get author list
  };

  // hand props to Login
  LoginWithProps = () => (
    <Login
      handleAppStateChange={this.handleStateChange}
    />
  );

  // hand props to Browser
  BrowserWithProps = () => (
    <Browser
      authorsList={this.state.authorsList}
      minYear={this.state.minYear}
      maxYear={this.state.maxYear}
    />
  );

  render() {
    const { classes } = this.props;
    const { loggedIn, isAdmin } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Router>
            <div>
              <Header loggedIn={loggedIn} isAdmin={isAdmin}/>
              <div className={classes.contentWrapper}>
                <Route exact path='/' component={this.BrowserWithProps}/>
                <Route path='/wiki' component={Wiki}/>
                <Route path='/about' component={About}/>
                <PrivateRoute path='/admin' component={Admin}/>
                <Route path='/login' component={this.LoginWithProps}/>
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
