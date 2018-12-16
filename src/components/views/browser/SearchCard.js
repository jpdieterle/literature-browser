import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import AuthorInput from "./AuthorInput";
import GenreSelection from "./GenreSelection";
import ContainsInput from "./ContainsInput";
import TimeInput from "./TimeInput";




function SearchCard(props) {
  const { classes } = props;
  return(
    <div>
      <Paper className={classes.backdrop}>
        <h4 color="primary">Ich bin eine SearchCard!</h4>
        {/*<IconButton className={classes.closeButton}>
          <CloseIcon/>
        </IconButton>*/}
        <form>
          <AuthorInput/>
          <GenreSelection/>
          <ContainsInput/>
          <TimeInput/>
          <Button size="small" color="primary">
            duplizieren
          </Button>
          <Button size="small" color="primary">
            löschen
          </Button>
        </form>
      </Paper>
    </div>
  )
}

SearchCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

// CSS
const styles = {
  backdrop: {
    width: 400,
    padding: 20,
    margin: 10,
  },
  wideInput: {
    //margin: 10,
  },
  narrowInput: {
    //
  }
};
export default withStyles(styles)(SearchCard);