import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';


const authorSuggestions = [
  {name: 'Goethe, Johann Wolfgang'},
  {name: 'Schiller, Friedrich'},
  {name: 'Rilke, Rainer Maria'},
  {name: 'Lessing, Gotthold Ephraim'},
];

class SelectMultipleAuthors extends React.Component {
  state = {
    inputValue: '',
    selectedItems: [],
  }
  render() {
    // Why does this have to be inside render?
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    return(
      <div>
        <Select>

        </Select>
      </div>
    )
  }
}

const styles = theme => {

}

export default withStyles(styles)(SelectMultipleAuthors);