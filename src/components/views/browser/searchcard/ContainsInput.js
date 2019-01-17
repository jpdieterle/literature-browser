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

  // Tipps zur Eingabe "Text enthält" in einer Teil-Suche
  keywordTips = `Tipps zur Stichworteingabe
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
  magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd 
  gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing 
  elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos 
  et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor 
  sit amet.`;

  onInputChange = (event) => {
    this.setState({keywords: event.target.value,}, () => {
      this.props.onInputChange(this.props.cardId, 'keywords', this.state.keywords); // update SearchCard
    });
  };

  render() {
    const { classes, variant, disabled } = this.props;
    const { keywords } = this.state;

    return(
      <div className={classes.root}>
        <Tooltip title={this.keywordTips} placement="right-start" disableHoverListener={disabled}>
          <TextField
            id="textContains"
            label="Text enthält"
            placeholder="Geben Sie Stichwörter ein"
            multiline
            fullWidth={true}
            className={classes.textField}
            variant={variant}
            disabled={disabled}
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
  disabled: PropTypes.bool.isRequired,
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