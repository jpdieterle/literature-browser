import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Switch, Route} from 'react-router-dom';
import AdminNav from './AdminNav';
import TextManagement from './tabs/TextManagement';
import ServerManagement from './tabs/ServerManagement';
import UserManagement from './tabs/UserManagement';
import MissingPage from '../MissingPage';
import NotificationContext from '../../notifications/NotificationContext';

// routing for Admin page
class Admin extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  requestStatus = func => {
    // check if session is still valid otherwise logout user
    fetch("/backend/lib/sessionManagement.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginStatus: true,
        loginID: this.props.sessionID
      })
    }).then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(!data || data.status === 'error') {
              this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error');
              this.props.handleAppChange('loggedIn', false);
              this.props.handleAppChange('isAdmin', false);
            } else {
              func();
            }
          });
        } else {
          this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error');
          this.logout();
        }
      }
    ).catch(error => {
        this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error', 404);
        this.logout();
      }
    );
  };

  render() {
    const {classes, requestNewAuthors, requestNewLog} = this.props;

    return (

      <div className={classes.root}>
        <AdminNav/>
        <div className={classes.pageContainer}>
          <Switch>
            <Route path='/admin/users' render={() => <UserManagement requestStatus={this.requestStatus} userStatus={this.requestStatus}/>} />
            <Route path='/admin/server' render={() => <ServerManagement requestStatus={this.requestStatus} userStatus={this.requestStatus}/>} />
            <Route path='/admin' render={() =>
              <TextManagement
                requestNewAuthors={requestNewAuthors}
                requestNewLog={requestNewLog}
                requestStatus={this.requestStatus}
              />}
            />
            <Route exact path='/admin/:other' render={() => <MissingPage/>} />
          </Switch>
        </div>
      </div>
    )
  }

}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  requestNewAuthors: PropTypes.func.isRequired,
  requestNewLog: PropTypes.func.isRequired,
  handleAppChange: PropTypes.func.isRequired,
  sessionID: PropTypes.any.isRequired,
};

Admin.contextType = NotificationContext;

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
  },
  pageContainer:{
    paddingLeft: 200,
  }
});

export default withStyles(styles)(Admin);