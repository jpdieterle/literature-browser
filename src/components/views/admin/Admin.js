import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Switch, Route} from 'react-router-dom';
import AdminNav from './AdminNav';
import AddText from './tabs/AddText';
import ServerManagement from './tabs/ServerManagement';
import UserManagement from './tabs/UserManagement';
import MissingPage from '../MissingPage';

class Admin extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AdminNav/>
        <div className={classes.pageContainer}>
          <Switch>
            <Route path='/admin/users' render={() => <UserManagement/>} />
            <Route path='/admin/server' render={() => <ServerManagement/>} />
            <Route path='/admin/texts' render={() => <AddText/>} />
            <Route exact path='/admin/:other' render={() => <MissingPage/>} />
          </Switch>
        </div>
      </div>
    )
  }

}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 4,
  },
  pageContainer:{
    paddingLeft: 200,
  },
});

export default withStyles(styles)(Admin);