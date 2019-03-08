import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Switch, Route} from 'react-router-dom';
import AdminNav from './AdminNav';
import TextManagement from './tabs/TextManagement';
import ServerManagement from './tabs/ServerManagement';
import UserManagement from './tabs/UserManagement';
import MissingPage from '../MissingPage';

// routing for Admin page
class Admin extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes, requestNewAuthors, requestNewLog, requestStatus} = this.props;

    return (

      <div className={classes.root}>
        <AdminNav/>
        <div className={classes.pageContainer}>
          <Switch>
            <Route path='/admin/users' render={() => <UserManagement requestStatus={requestStatus}/>} />
            <Route path='/admin/server' render={() => <ServerManagement requestStatus={requestStatus}/>} />
            <Route path='/admin' render={() => <TextManagement requestNewAuthors={requestNewAuthors} requestNewLog={requestNewLog} requestStatus={requestStatus}/>} />
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

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 4,
  },
  pageContainer:{
    paddingLeft: 200,
  }
});

export default withStyles(styles)(Admin);