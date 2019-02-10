import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class MissingPage extends React.Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Typography color={'error'} variant={'h6'}>
          Diese Seite existiert nicht. Bitte benutzen Sie die Navigationsleiste.
        </Typography>
      </div>
    )
  }

}

MissingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 4
  },
});

export default withStyles(styles)(MissingPage);