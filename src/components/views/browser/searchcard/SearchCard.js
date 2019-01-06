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

class SearchCard extends React.Component {
  state = {
    inputValues: this.props.initialValues, //  {authors: [], genres: [], keywords: '', timeFrom: 1700, timeTo: 1950}
  };

  inputVariant = this.props.inputVariant;

  /*handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };*/

  updateInputValue = (prop, value) => {
    console.log('card state before update: ' + this.state);
    console.log('card inputValues before update: ' + this.state.inputValues);
    // let {newInputValues} = this.state.inputValues;
    let newInputValues = JSON.parse(JSON.stringify(this.state.inputValues));
    console.log(newInputValues);
    newInputValues[prop] = JSON.parse(JSON.stringify(value));
    this.setState({inputValues: newInputValues}, () => {
      this.props.onContentChange(this.props.key, prop, this.state.inputValues); // update Browser state
    });
    setTimeout(() => {console.log('card state after update: ' + JSON.stringify(this.state));}, 3000);

  };

  onDeleteCard = () => {this.props.onDelete(this.props.id)};

  onDuplicateCard = () => {this.props.onDuplicate(this.state.inputValues)};

  render() {
    const { classes, id, getIndex } = this.props;
    const { inputValues } = this.state;
    return(
      <div className={classes.root}>
        <Paper className={classes.backdrop}>
          <div className={classes.topContainer}>
            <Typography variant={'h6'} color={'primary'} className={classes.title}>
              Suche Teil {getIndex(id) + 1} (id: {id})
            </Typography>
            <IconButton className={classes.closeButton} onClick={this.onDeleteCard} >
              <CloseButton color={'secondary'}/>
            </IconButton>
          </div>
          <form>
            <AuthorInput
              variant={inputVariant}
              initialValues={inputValues.authors}
              onInputChange={this.updateInputValue.bind(this)}
            />
            <GenreSelection
              variant={inputVariant}
              initialValues={inputValues.genres}
              onInputChange={this.updateInputValue.bind(this)}
            />
            <ContainsInput
              variant={inputVariant}
              initialValue={inputValues.keywords}
              onInputChange={this.updateInputValue.bind(this)}
            />
            <TimeInput
              variant={inputVariant}
              initialTimeFrom={inputValues.timeFrom}
              initialTimeTo={inputValues.timeTo}
              onInputChange={this.updateInputValue.bind(this)}
            />
          </form>
          <Button size="small" color="primary" className={classes.button} onClick={this.onDuplicateCard}>
            duplizieren
          </Button>
        </Paper>
      </div>
    );
  }
}

SearchCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  initialValues: PropTypes.object.isRequired,
  getIndex: PropTypes.func.isRequired,
  inputVariant: PropTypes.string.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
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