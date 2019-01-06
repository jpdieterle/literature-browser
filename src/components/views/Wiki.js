import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

function Wiki(props) {
  const { classes } = props;
  return(
    <div></div>
    // TODO: Bsp.-Anfrage => Logik dahinter verständlich machen (Link auf Browser-Seite!)
  )
}

Wiki.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wiki);