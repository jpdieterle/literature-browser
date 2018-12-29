import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

// TODO: use Snackbar
function InfoCard(props) {
  const { classes } = props;
  return(
    <div>Ich bin eine Infocard!</div>
  )
}

InfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoCard);