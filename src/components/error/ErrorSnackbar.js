import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


class ErrorSnackbar extends React.Component {
  state = {
    open: this.props.open,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

  renderErrorText = (message, statusCode) => {
    let errorText = '';
    if(statusCode) {
      switch (statusCode) {
        case 404:
          errorText = 'Der Server konnte nicht gefunden werden';
          break;
        case 500:
          errorText = 'Es ist ein Fehler auf dem Server aufgetreten';
          break;
        case 503:
          errorText = 'Der Server ist im Moment nicht verfügbar. Bitte versuchen Sie es später noch einmal.';
          break;
        case 550:
          errorText = this.props.component === 'browser'?
            'Sie sind nicht berechtigt, diese Suche durchzuführen.' :
            'Es gibt kein Nutzerkonto mit diesen Zugangsdaten.'
          ;
          break;
        default:
          errorText = `Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.`;
      }
    } else {
      errorText = message;
    }
    return errorText;
  };

  render() {
    const {classes, message} = this.props;
    const { open } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={open}
          autoHideDuration={8000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classes.error}
            message={message}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    )
  }

}

ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  statusCode: PropTypes.number,
  open: PropTypes.bool.isRequired,
};

ErrorSnackbar.defaultProps = {
  message: 'Es ist ein Fehler aufgetreten.',
};

const styles = theme => ({
  root: {},
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default withStyles(styles)(ErrorSnackbar);