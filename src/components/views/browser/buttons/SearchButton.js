import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class SearchButton extends React.Component {
  state = {};

  buttonLabel = (this.props.variant === 'search')? 'Suchen' : 'gesamten Korpus herunterladen';
  buttonVariant = (this.props.variant === 'search')? 'contained' : 'text';

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Button color={'primary'} variant={this.buttonVariant} disabled={this.props.getDisabled()}>
          {this.buttonLabel}
        </Button>
      </div>
    )
  }
}

SearchButton.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string,
  getDisabled: PropTypes.func.isRequired,
};

const styles = theme => ({
  root:{
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(SearchButton);