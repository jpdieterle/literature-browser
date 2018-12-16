import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

function ContainsInput(props) {
  const { classes } = props;
  return(
    <div>
      <div>Ich bin ein Suchfeld für Stichwörter!</div>
    </div>
  )
}

ContainsInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainsInput);