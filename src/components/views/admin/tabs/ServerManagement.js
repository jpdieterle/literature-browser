import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InfoButton from '@material-ui/icons/Info';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper/Paper";

class ServerManagement extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  // TODO: empty cache request

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Paper className={classes.serverPaper}>
          <InfoButton color={"primary"} className={classes.infoIcon}/>
          <Typography color={"primary"} className={classes.serverBox}>
            Hier können Sie den Cache der Suchaufrufe nach belieben leeren.
          </Typography>
        </Paper>
        <Button color="inherit"  className={classes.cacheButton}> Cache Leeren </Button>
         </div>
    )
  }

}

ServerManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles =  ({
  serverPaper: {
    marginTop:'10px',
    marginRight: '20px',
  },
  serverBox: {
    padding: 5,
    display: 'flex',
  },
  cacheButton: {
    backgroundColor: '#CCCCCC',
    marginTop: '10px',
  }
});

export default withStyles(styles)(ServerManagement);