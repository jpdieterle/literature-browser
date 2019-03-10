import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import keycode from 'keycode';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

// Quelle: https://material-ui.com/demos/autocomplete/ (Stand: Dezember 2018, mit eigenen Veränderungen)

// render input field for user
const InputField = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      variant={inputProps.variant}
      InputLabelProps={{disableAnimation: false,}}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
};

// render author list to be displayed below input field
const Suggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  );
};

Suggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItems: PropTypes.string,
  suggestion: PropTypes.string.isRequired,
};

// render AuthorInput component
class AuthorInput extends React.PureComponent {
  state = {
    inputValue: '',
    selectedItems: this.props.initialValues, // shape: ['Goethe, Johann Wolfgang', 'Rilke, Rainer Maria']
  };

  // handle pressing of keys (used to detect user deleting with backspace key)
  handleKeyDown = event => {
    const { inputValue, selectedItems } = this.state;

    if (selectedItems.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItems: selectedItems.slice(0, selectedItems.length - 1),
      });
    }
  };

  // extract suggestions from authorsList (max. 15 suggestions are being displayed)
  getSuggestions = value => {
    if(!value && value !== '') return ;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0 ? [] : this.props.authorsList.filter(author => {
      const keep = (count < 15 && author.toLowerCase().includes(inputValue)
        && this.state.selectedItems.indexOf(author) === -1);
      if (keep) {
        count += 1;
      }
      return keep;
    });
  };

  // set new state when input changes (not selected authors)
  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  // add new selected author to list that will be used for search
  handleChange = item => {
    let { selectedItems } = this.state;

    // allow a max. of 10 authors per search card
    if (selectedItems.length === 10) return;

    if (selectedItems.indexOf(item) === -1) {
      selectedItems = [...selectedItems, item];
    }

    this.setState({
      inputValue: '',
      selectedItems: selectedItems,
    }, () => {
      this.props.onInputChange(this.props.cardId, 'authors', this.state.selectedItems); // update SearchCard state
    });
  };

  // delete selected authors from state => not search for them
  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItems];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItems: selectedItem };
    });
  };

  render() {
    const { classes, variant, disabled, autofocus } = this.props;
    const { inputValue, selectedItems } = this.state;

    return(
      <div className={classes.root}>
        <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItems}>
          {({getInputProps, getItemProps, isOpen, inputValue: inputValue2, selectedItem: selectedItem2,
              highlightedIndex,}) => (
            <div className={classes.container}>
              {InputField({
                fullWidth: true,
                autoFocus: autofocus,
                classes,
                InputProps: getInputProps({
                  startAdornment: selectedItems.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={this.handleDelete(item)}
                    />
                  )),
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  value: inputValue,
                  placeholder: 'Bsp.: Rilke, Rainer Maria',
                }),
                label: 'Autor*in',
                variant: variant,
                disabled: disabled,
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {this.getSuggestions(inputValue2).map((suggestion, index) =>
                    Suggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    );

  }
}

AuthorInput.propTypes = {
  classes: PropTypes.object.isRequired,
  cardId: PropTypes.string.isRequired,
  variant: PropTypes.string,
  initialValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  autofocus: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  authorsList: PropTypes.arrayOf(PropTypes.string),
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 5,
  },
  container: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
});
export default withStyles(styles)(AuthorInput);
