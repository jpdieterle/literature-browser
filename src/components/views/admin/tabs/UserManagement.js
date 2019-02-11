import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InfoButton from '@material-ui/icons/Info';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper/Paper";

class UserManagement extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // TODO: add user
  // TODO: remove user
  // TODO: change PW

  render() {
    const {classes} = this.props;

    // TODO: render user list (w/ checkboxes)

    return (
      <div>
        <Paper className={classes.nutzerpaper}>
        <InfoButton color={"primary"} className={classes.infoIcon}/>
        <Typography color={"primary"} className={classes.nutzerBox}>
          Hier können Sie Nutzer hinzufügen und entfernen.
        </Typography>
      </Paper>
        <Button color="inherit"  className={classes.nutzerbutton}> Nutzer </Button>
      </div>
    )
  }

}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {},
  nutzerpaper: {
    marginTop:'10px',
    marginRight: '20px',

      },
  nutzerBox: {
    padding: 5,
    display: 'flex',
  },
  nutzerbutton: {
    backgroundColor: '#CCCCCC',
    marginTop: '10px'
  }
});

export default withStyles(styles)(UserManagement);