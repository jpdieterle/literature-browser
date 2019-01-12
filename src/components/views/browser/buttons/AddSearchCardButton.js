import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class AddSearchCardButton extends React.Component {
  state = {

  };

  render() {
    const { classes, action, getDisabled } = this.props;
    return(
      <div className={classes.root}>
        <Button
          color="primary"
          variant="outlined"
          disabled={getDisabled()}
          onClick={action}>
          <AddIcon/>
          neue Teil-Suche hinzufügen
        </Button>
      </div>
    )
  }

}

AddSearchCardButton.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  getDisabled: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
});
export default withStyles(styles)(AddSearchCardButton);