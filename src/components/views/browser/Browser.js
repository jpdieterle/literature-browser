import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchCard from "./SearchCard";
import AddSearchCardButton from "./AddSearchCardButton";
import SearchButton from "./SearchButton";
import SelectFormat from "./SelectFormat";

const minYear = 1700;
const maxYear = 1950;

const initialSearchCardObject = {
  key: 'sc-1',
  authors: [],
  genres: [],
  keywords: '',
  timeFrom: minYear,
  timeTo: maxYear,
};

class Browser extends React.Component {
  state = {
    cardList: [initialSearchCardObject],
    selectedFormats: [],
  };

  handleChange = name => event => {
    // TODO: update cardList in state when input changes (in SearchCard)
    this.setState({
      [name]: event.target.value,
    });
  };

  deleteSearchCard() {
    // TODO: remove card object from state
  }

  // fügt eine leere Karte oder ein Duplikat einer Karte hinzu
  onAddSearchCard(inputValues) {

    if(this.state && this.state.cardList.length > 7 ) {
      // TODO: Hinweis anzeigen, dass nicht mehr als 8 Karten hinzugefügt werden können.
      return;
    }

    let paramsPassed = (inputValues instanceof Object && 'authors' in inputValues);
    inputValues = paramsPassed? inputValues : initialSearchCardObject;
    console.log(inputValues);

    // setze key von neuer Karte
    inputValues.key = inputValues.key.substr(0,3) + (this.state.cardList.length + 1).toString();

    this.setState(state => ({
      // füge neue Karte zu cardList hinzu
      cardList: [...state.cardList, inputValues]
    }));
  }

  render() {
    const { classes } = this.props;
    const { cardList } = this.state;

    return(
      <div className={classes.root}>
        <div className={classes.flexContainerCards}>
          {cardList.map((card, index) => (
            <SearchCard
              key={index}
              inputValues={card}
              index={index}
              onDuplicate={this.onAddSearchCard.bind(this)}
              onDelete={this.deleteSearchCard.bind(this)}
              onChange={this.handleChange.bind(this)}
            />
          ))}
        </div>
        <AddSearchCardButton action={this.onAddSearchCard.bind(this)}/>
        <div className={classes.flexContainerFormat}>
          <SelectFormat/>
        </div>

        <SearchButton/>
      </div>
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root:{

  },
  flexContainerCards:{
    display: 'flex',
    flexFlow: 'row wrap',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  flexContainer2:{

  },
  flexContainer3:{

  },
  flexContainerFormat:{
    display: 'flex',
  },
};

export default withStyles(styles)(Browser);