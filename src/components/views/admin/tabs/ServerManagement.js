import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import NotificationContext from '../../../notifications/NotificationContext';
import InfoCard from '../../../InfoCard';

// "Server verwalten" tab in Admin View
class ServerManagement extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  // request server to empty its cache
  requestEmptyCache = () => {
    this.handleChange('loading', true);
    fetch(' /backend/lib/admin.php',{
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({cache: true})
    })
      .then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(data && data.status === 'success') {
              // cache was emptied
              this.context.handleNotificationChange(true, 'Der Server-Cache wurde geleert.', 'emptyCache', 'success');
            } else {
              this.context.handleNotificationChange(true, 'Der Server-Cache konnte nicht geleert werden.', 'emptyCache', 'error');
            }
          })
        } else {
          this.context.handleNotificationChange(true, 'Der Server-Cache konnte nicht geleert werden.', 'emptyCache', 'error');
        }
        this.handleChange('loading', false);

      })
      .catch(error => {
        this.context.handleNotificationChange(true, 'Der Server-Cache konnte nicht geleert werden.', 'emptyCache', 'error');
        this.handleChange('loading', false);
      });
  };

  render() {
    const {classes} = this.props;
    const {loading} = this.state;

    return (
      <div>
        <InfoCard message={'Hier können Sie den Cache der Suchaufrufe auf dem Server leeren.'}/>
        <Button
          color={'primary'}
          variant={'contained'}
          disabled={loading}
          className={classes.cacheButton}
          onClick={this.requestEmptyCache}
        >
          Cache Leeren
        </Button>
         </div>
    )
  }

}

ServerManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

ServerManagement.contextType = NotificationContext;

const styles =  theme => ({
  serverPaper: {
    marginTop:'10px',
    marginRight: '20px',
  },
  serverBox: {
    padding: 5,
    display: 'flex',
  },
  cacheButton: {
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(ServerManagement);