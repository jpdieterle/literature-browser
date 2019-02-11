import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InfoButton from '@material-ui/icons/Info';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper/Paper";


class AddText extends Component {
  state= {
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // TODO: add text request

  // TODO: format example

  // TODO: text input

  // TODO: submit button

  // TODO: delete input button

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper>
        <InfoButton color={"primary"} className={classes.infoIcon}/>
        <Typography color={"primary"} className={classes.infoBox}>
          Hier können Sie weitere Texte zur Gutenberg-Sammlung hinzufügen.
        </Typography>
        </Paper>
        <Button color="inherit"  className={classes.importbutton}> Import </Button>
      </div>
    )
  }

}

AddText.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    padding: '10px',
    paddingLeft: theme.spacing.unit * 3,
  },
  infoBox:{
    maxWidth: 800 + theme.spacing.unit*7,
    padding: 5,
    display: 'flex',
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
  importbutton:{
    backgroundColor: '#CCCCCC',
  },


});

export default withStyles(styles)(AddText);