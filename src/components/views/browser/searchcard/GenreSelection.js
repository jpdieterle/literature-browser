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

class GenreSelection extends React.PureComponent {
  state = {
    genre: this.props.initialValues,
  };

  componentWillMount = () => {
    console.log('genres in GenreSelection will mount: ', this.props.genres);
  };

  componentWillUpdate = () => {
    console.log('genres in GenreSelection will update: ', this.props.genres);
  };

  handleChange = event => {
    this.setState({ genre: event.target.value }, () => {
      this.props.onInputChange(this.props.cardId, 'genres', this.state.genre); // update SearchCard state
    });
  };

  render() {
    const { classes, variant, disabled, genres } = this.props;
    const { genre } = this.state;
    return(
      <div className={classes.root}>
        <FormControl variant={variant} fullWidth={true} disabled={disabled}>
          <InputLabel htmlFor="selectGenre">Genre(s)</InputLabel>
          <Select
            multiple
            value={genre}
            onChange={this.handleChange}
            input={<Input id="selectGenre" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {genres && genres.isArray && genres.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={genre.indexOf(name) > -1} disableRipple={true} color={"primary"}/>
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

GenreSelection.propTypes = {
  classes: PropTypes.object.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  cardId: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  initialValues: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 5,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    position: 'relative',
  },
});

export default withStyles(styles)(GenreSelection);