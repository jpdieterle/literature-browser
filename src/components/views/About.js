import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class About extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        Ich bin die About Seite!
        <div>
          Favicon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a>
          from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
          <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root:{
    marginLeft: theme.spacing.unit * 4
  }
});

export default withStyles(styles)(About);