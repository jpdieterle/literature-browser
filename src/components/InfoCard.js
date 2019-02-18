import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import InfoButton from '@material-ui/icons/Info';

function InfoCard(props) {
  const { classes, message } = props;
  return(
    <Paper className={classes.infoBox}>
      <InfoButton color={"primary"} className={classes.infoIcon}/>
      <Typography color={"primary"}>
        {message}
      </Typography>
    </Paper>
  )
}

InfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
};

const styles = theme => ({
  infoBox:{
    minWidth: 400,
    maxWidth: 800 + theme.spacing.unit*7,
    padding: 20,
    display: 'flex',
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles)(InfoCard);