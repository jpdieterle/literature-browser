import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

function SearchButton(props) {
  const { classes } = props;
  return(
    <div>
      <div>Ich bin ein SearchButton!</div>
    </div>
  )
}

SearchButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButton);