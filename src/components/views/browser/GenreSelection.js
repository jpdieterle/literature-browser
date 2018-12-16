import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genres = [
  'Ballade',
  'Gedicht',
  'Sonett',
];

class GenreSelection extends React.Component {
  state = {
    genre: [],
  };

  handleChange = event => {
    this.setState({ genre: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return(
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="selectGenre">Genre(s)</InputLabel>
          <Select
            multiple
            value={this.state.genre}
            onChange={this.handleChange}
            input={<Input id="selectGenre" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {genres.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.genre.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

GenreSelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    //margin: theme.spacing.unit,
    minWidth: 100,
    maxWidth: 300,
  },
});

export default withStyles(styles)(GenreSelection);