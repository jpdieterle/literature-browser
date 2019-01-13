import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

//TODO: regex (oÄ) unterstützen
class ContainsInput extends React.PureComponent {
  state = {
    keywords: this.props.initialValue,
  };

  onInputChange = (event) => {
    this.setState({keywords: event.target.value,}, () => {
      this.props.onInputChange(this.props.cardId, 'keywords', this.state.keywords); // update SearchCard
    });
  };

  render() {
    const { classes, variant, getDisabled } = this.props;
    const { keywords } = this.state;

    return(
      <div className={classes.root}>
        <Tooltip title="Tipps zur Stichworteingabe" placement="right-start">
          <TextField
            id="textContains"
            label="Text enthält"
            placeholder="Geben Sie Stichwörter ein"
            multiline
            fullWidth={true}
            className={classes.textField}
            variant={variant}
            disabled={getDisabled()}
            value={keywords}
            onChange={this.onInputChange}
          />
        </Tooltip>
      </div>
    );
  }
}

ContainsInput.propTypes = {
  classes: PropTypes.object.isRequired,
  cardId: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  getDisabled: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

const styles = theme => ({
  root:{
    flexGrow: 1,
    paddingTop: 5,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    position: 'relative',
  },
  textField:{
    //marginTop: theme.spacing.unit,
  }
});

export default withStyles(styles)(ContainsInput);