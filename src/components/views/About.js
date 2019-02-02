import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class About extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div>Ich bin die About-Seite!</div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {

};

export default withStyles(styles)(About);