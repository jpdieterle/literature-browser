import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

function TimeInput(props) {
  const { classes } = props;
  return(
    <div>
      <div>Ich bin ein Suchfeld für die Zeitspanne!</div>
    </div>
  )
}

TimeInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeInput);