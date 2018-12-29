import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchCard from "./SearchCard";
import AddSearchCardButton from "./AddSearchCardButton";

const styles = {

};

function Browser(props) {
  const { classes } = props;
  return(
    <div>
      <div>Ich bin der Browser!</div>
      <SearchCard/>
      <AddSearchCardButton/>
    </div>
  )
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Browser);