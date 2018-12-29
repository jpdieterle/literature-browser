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

class SearchCard extends React.Component {
  state = {

  };

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Paper className={classes.backdrop}>
          {/*<IconButton className={classes.closeButton}>
          <CloseIcon/>
        </IconButton>*/}
          <br/>
          <form>
            <AuthorInput/>
            <GenreSelection/>
            <ContainsInput/>
            <TimeInput/>
            <Button size="small" color="primary">
              duplizieren
            </Button>
            <Button size="small" color="secondary">
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