import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function FullSearchButton(props) {
  const { classes } = props;
  return(
    <div className={classes.root}>
      <Button color={'primary'}>
        gesamten Korpus laden
      </Button>
    </div>
  )
}

FullSearchButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root:{
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(FullSearchButton);