import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function AddSearchCardButton(props) {
  const { classes } = props;
  return(
    <div className={classes.wrapper}>
      <Button color="primary" >leere Karte hinzufügen</Button>
    </div>
  )
}

AddSearchCardButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  wrapper: {
    padding: 20,
  },
};
export default withStyles(styles)(AddSearchCardButton);