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
  state = {}; // stateless component (container for inputs)

  /*handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };*/

  render() {
    console.log('render sc');
    const { classes, id, getIndex, getDisabled, inputVariant, initialValues, onDuplicate, onContentChange, onDelete } = this.props;

    return(
      <div className={classes.root}>
        <Paper className={classes.backdrop}>
          <div className={classes.topContainer}>
            <Typography variant={'h6'} color={'primary'} className={classes.title}>
              Suche Teil {getIndex(id) + 1}
            </Typography>
            <IconButton className={classes.closeButton} onClick={() => onDelete(id)} disabled={getDisabled()}>
              <CloseButton color={'secondary'}/>
            </IconButton>
          </div>
          <AuthorInput
            cardId={id}
            variant={inputVariant}
            initialValues={initialValues.authors}
            getDisabled={getDisabled}
            onInputChange={onContentChange}
          />
          <GenreSelection
            cardId={id}
            variant={inputVariant}
            initialValues={initialValues.genres}
            getDisabled={getDisabled}
            onInputChange={onContentChange}
          />
          <ContainsInput
            cardId={id}
            variant={inputVariant}
            initialValue={initialValues.keywords}
            getDisabled={getDisabled}
            onInputChange={onContentChange}
          />
          <TimeInput
            cardId={id}
            variant={inputVariant}
            initialTimeFrom={initialValues.timeFrom}
            initialTimeTo={initialValues.timeTo}
            getDisabled={getDisabled}
            onInputChange={onContentChange}
          />
          <Button
            size="small"
            color="primary"
            className={classes.button}
            disabled={getDisabled()}
            onClick={() => onDuplicate(id)}
          >
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
  getDisabled:PropTypes.func.isRequired,
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