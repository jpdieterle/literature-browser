import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select'; // API: https://material-ui.com/api/select/
import MenuItem from '@material-ui/core/MenuItem'; // API: https://material-ui.com/api/menu-item/
import NoSsr from '@material-ui/core/NoSsr';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

// TODO: get list from backend
const authorList = ['Goethe, Johann Wolfgang', 'Schiller, Friedrich', 'Rilke, Rainer Maria', 'Lessing, Gotthold Ephraim'];
const suggestionList = authorList.map(author => ({value: author, label: author})); // turn author array into object array

class SelectAuthors extends React.Component {
  state = {
    inputValue: [],
    selectedItems: [],
  };

  handleStateChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  // new item has been selected
  handleSelectChange = (event, child) => {
    if(this.state.selectedItems.some(element => element.name === event.target.value) == false){
      this.addChip(event.target.value);
    }
  };

  addChip = name => {

  };
  //const SelectComponents = {};

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return(
      <div>
        <FormControl>
          <InputLabel htmlFor="selectAuthors">Autor*in</InputLabel>
          <Select
            id={'authorSelection'}
            className={classes.select}
            value={this.state.inputValue} // inputValue saved in state
            input={<Input id="selectAuthors" />}
            placeholder={'Bsp.: Rilke, Rainer Maria'}
            multiple
            onChange={this.handleSelectChange}
          >
            <TextField fullWidth>

            </TextField>
            // add author options to dropdown menu
            {authorList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
    )
  }
}

SelectAuthors.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  select: {
    minWidth: 100,
  },
});

export default withStyles(styles)(SelectAuthors);