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

// credit: https://material-ui.com/demos/autocomplete/

// TODO: replace with external and complete list
const authorSuggestions = [
  {label: 'Goethe, Johann Wolfgang'},
  {label: 'Schiller, Friedrich'},
  {label: 'Rilke, Rainer Maria'},
  {label: 'Spitteler, Carl'},
  {label: 'Dauthendey, Max'},
  {label: 'Grün, Anastasius'},
  {label: 'Lessing, Gotthold Ephraim'},
];

// render author list to be displayed below input field
function renderInput(inputProps) {
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
}

// extract suggestions from list above
function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : authorSuggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItems: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

// use class component to get input state
class AuthorInput extends React.Component {
  state = {
    inputValue: '',
    selectedItems: this.props.initialValues,
  };

  handleKeyDown = event => {
    const { inputValue, selectedItems } = this.state;

    if (selectedItems.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItems: selectedItems.slice(0, selectedItems.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItems } = this.state;

    if (selectedItems.indexOf(item) === -1) {
      selectedItems = [...selectedItems, item];
    }

    this.setState({
      inputValue: '',
      selectedItems: selectedItems,
    }, () => {
      this.props.onInputChange('authors', this.state.selectedItems); // update SearchCard state
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItems];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItems: selectedItem };
    });
  };

  render() {
    const { classes, variant, getDisabled } = this.props;
    const { inputValue, selectedItems } = this.state;

    return(
      <div className={classes.root}>
        <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItems}>
          {({getInputProps, getItemProps, isOpen, inputValue: inputValue2, selectedItem: selectedItem2,
              highlightedIndex,}) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
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
                disabled: getDisabled(),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue2).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
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
  variant: PropTypes.string,
  initialValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  getDisabled: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
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
