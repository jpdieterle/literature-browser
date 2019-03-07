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
    selectedGenre: this.props.initialValues,
    genres: this.props.genres,
  };

  componentWillMount = () => {
    console.log('genres in GenreSelection will mount: ', this.props.genres);
  };

  componentWillUpdate = () => {
    console.log('genres in GenreSelection will update: ', this.props.genres);
  };

  // update state with new genres if prop changes
  componentWillReceiveProps = nextProps => {
    if(this.props.genres !== nextProps.genres) {
      console.log('nextProps genre: ', nextProps.genres, Array.isArray(nextProps.genres));
      this.setState({genres: nextProps.genres});
    }
  };

  handleChange = event => {
    this.setState({ selectedGenre: event.target.value }, () => {
      this.props.onInputChange(this.props.cardId, 'genres', this.state.selectedGenre); // update SearchCard state
    });
  };

  render() {
    const { classes, variant, disabled } = this.props;
    const { genres, selectedGenre } = this.state;
    return(
      <div className={classes.root}>
        <FormControl variant={variant} fullWidth={true} disabled={disabled}>
          <InputLabel htmlFor="selectGenre">Genre(s)</InputLabel>
          <Select
            multiple
            value={selectedGenre}
            onChange={this.handleChange}
            input={<Input id="selectGenre" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {genres && Array.isArray(genres) && genres.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  checked={selectedGenre.indexOf(name) > -1}
                  disableRipple={true}
                  color={"primary"}
                />
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