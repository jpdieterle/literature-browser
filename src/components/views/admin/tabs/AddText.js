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
      <div>
        <Paper className={classes.textPaper}>
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
  textPaper: {
    paddingTop: '10px',
  },
  infoBox:{
    padding: 5,
    display: 'flex',
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
  importbutton:{
    backgroundColor: '#CCCCCC',
      marginTop: '10px'
  },


});

export default withStyles(styles)(AddText);