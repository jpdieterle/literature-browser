import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

class SelectFormat extends React.Component {
  state = {
    checkedTXT: true,
    checkedJSON: false,
    checkedXML: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  checkboxes = ['txt', 'json', 'xml'];

  render() {
    const { classes } = this.props;
    const { selectedFormat } = this.state;
    return(
      <div className={classes.root}>
        <FormGroup row>
          {this.checkboxes.map((format, index) => (
            <FormControlLabel
              key={'format-' + index.toString()}
              control={
                <Checkbox
                  checked={this.state["checked" + format.toUpperCase()]}
                  onChange={this.handleChange(format)}
                  value={"checked" + format.toUpperCase()}
                  color="primary"
                  disableRipple={true}
                />
              }
              label={format.toUpperCase()}
            />
          ))}
        </FormGroup>
      </div>
    )
  }
}

SelectFormat.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root:{
    marginLeft: theme.spacing.unit * 3,
  }
});

export default withStyles(styles)(SelectFormat);