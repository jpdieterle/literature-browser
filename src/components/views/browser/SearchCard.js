import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import CloseButton from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import AuthorInput from "./AuthorInput";
import GenreSelection from "./GenreSelection";
import ContainsInput from "./ContainsInput";
import TimeInput from "./TimeInput";


const inputVariant = 'standard';

// Zeitspanne, für die Texte vorhanden sind:
const minYear = 1700;
const maxYear = 1950;

class SearchCard extends React.Component {
  state = {
    index: this.props.index,
    authors: this.props.inputValues.authors,
    genres: this.props.inputValues.genres,
    keywords: this.props.inputValues.keywords,
    timeFrom: this.props.inputValues.timeFrom,
    timeTo: this.props.inputValues.timeTo,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, onDuplicate} = this.props;
    const { index, authors, genres, keywords, timeFrom, timeTo } = this.state;
    return(
      <div className={classes.root}>
        <Paper className={classes.backdrop}>
          <div className={classes.topContainer}>
            <Typography variant={'h6'} color={'primary'} className={classes.title}>
              Suche Teil {index + 1}
            </Typography>
            <IconButton className={classes.closeButton}>
              <CloseButton color={'secondary'}/>
            </IconButton>
          </div>
          <form>
            <AuthorInput
              variant={inputVariant}
              initialInputValue={authors}
              onInputChange={this.handleChange.bind(this)}
            />
            <GenreSelection
              variant={inputVariant}
              initialInputValue={genres}
              onInputChange={this.handleChange.bind(this)}
            />
            <ContainsInput
              variant={inputVariant}
              initialInputValue={keywords}
              onInputChange={this.handleChange.bind(this)}
            />
            <TimeInput
              variant={inputVariant}
              initialTimeFrom={timeFrom}
              initialTimeTo={timeTo}
              onInputChange={this.handleChange.bind(this)}
            />
          </form>
          <Button size="small" color="primary" className={classes.button} onClick={onDuplicate()}>
            duplizieren
          </Button>
          <Button size="small" color="secondary" className={classes.button}>
            löschen
          </Button>
        </Paper>
      </div>
    );
  }
}

SearchCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const styles = theme => ({
  root:{},
  backdrop: {
    width: 400,
    padding: 20,
    margin: 10,
  },
  topContainer:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  button:{
    marginTop: 10,
  },
  closeButton:{
    marginTop: -(theme.spacing.unit),
    marginRight: -(theme.spacing.unit),
  },
  title:{
    marginLeft: theme.spacing.unit,
    //float: 'left',
  }
});
export default withStyles(styles)(SearchCard);