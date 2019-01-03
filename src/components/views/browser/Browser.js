import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchCard from "./SearchCard";
import AddSearchCardButton from "./AddSearchCardButton";

class Browser extends React.Component {
  state = {
    cardList: [],
  };
  searchCardCounter=1;

  deleteSearchCard() {
    // move to searchcard component?! (button in searchcard)
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <div></div>
        {}
        <SearchCard/>
        <AddSearchCardButton/>
      </div>
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {

};

export default withStyles(styles)(Browser);