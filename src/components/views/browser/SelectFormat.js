import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

function SelectFormat(props) {
  const { classes } = props;
  return(
    <div>
      <div>Ich bin die Formatauswahl!</div>
    </div>
  )
}

SelectFormat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectFormat);