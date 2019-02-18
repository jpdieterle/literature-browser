import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root:{
    marginLeft: theme.spacing.unit * 4
  }
});

function Wiki(props) {
  const { classes } = props;
  return(
    <div className={classes.root}>Ich bin das Wiki!</div>
    // TODO: Bsp.-Anfrage => Logik dahinter verständlich machen (Link auf Browser-Seite!)
  )
}

Wiki.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wiki);