import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import AuthorInput from "./AuthorInput";
import GenreSelection from "./GenreSelection";
import ContainsInput from "./ContainsInput";
import TimeInput from "./TimeInput";

const inputVariant = 'standard';

class SearchCard extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Paper className={classes.backdrop}>
          <form>
            <AuthorInput variant={inputVariant}/>
            <GenreSelection variant={inputVariant}/>
            <ContainsInput variant={inputVariant}/>
            <TimeInput variant={inputVariant}/>
            <Button size="small" color="primary" className={classes.button}>
              duplizieren
            </Button>
            <Button size="small" color="secondary" className={classes.button}>
              löschen
            </Button>
          </form>
        </Paper>
      </div>
    );
  }

}

SearchCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root:{},
  backdrop: {
    width: 400,
    padding: 20,
    margin: 10,
  },
  button:{
    marginTop: 10,
  },
};
export default withStyles(styles)(SearchCard);