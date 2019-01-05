import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchCard from "./SearchCard";
import AddSearchCardButton from "./AddSearchCardButton";
import SearchButton from "./SearchButton";
import SelectFormat from "./SelectFormat";
import shortid from 'shortid';

const minYear = 1700;
const maxYear = 1950;

const initialSearchCardObject = {
  id: shortid.generate(),
  authors: [],
  genres: [],
  keywords: '',
  timeFrom: minYear,
  timeTo: maxYear,
};

class Browser extends React.Component {
  state = {
    cardList: [JSON.parse(JSON.stringify(initialSearchCardObject))],
    selectedFormats: [],
  };

  getCardIndex = id => {
    return this.state.cardList.findIndex(card => card.id === id);
  };

  handleChange = name => event => {
    // TODO: update cardList in state when input changes (in SearchCard)
    this.setState({
      [name]: event.target.value,
    });
  };

  // fügt eine leere Karte oder ein Duplikat einer Karte hinzu
  onAddSearchCard(inputValues) {

    if(this.state && this.state.cardList.length > 7 ) {
      // TODO: Hinweis anzeigen, dass nicht mehr als 8 Karten hinzugefügt werden können.
      return;
    }

    let paramsPassed = (inputValues instanceof Object && 'authors' in inputValues);
    inputValues = paramsPassed? inputValues : JSON.parse(JSON.stringify(initialSearchCardObject));

    inputValues.id = shortid.generate();

    this.setState(state => ({
      cardList: [...state.cardList, inputValues]
    }));
  }

  updateSearchCardContent(index, inputValues) {
    // TODO: insert new search card input into browser state
  }

  deleteSearchCard(id) {
    if(this.state.cardList.length === 1) {
      // TODO: update index of remaining card to 0
      return; // letzte verbleibende Karte soll nicht gelöscht werden
    }
    this.setState(state => ({
      cardList: state.cardList.filter( card => (card.id !== id))
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
              key={card.id} // not passed to component by react! => use id instead
              id={card.id}
              index={index}
              initialValues={{
                authors: card.authors,
                genres: card.genres,
                keywords: card.keywords,
                timeFrom: card.timeFrom,
                timeTo: card.timeTo,
              }}
              getIndex={this.getCardIndex.bind(this)}
              onDuplicate={this.onAddSearchCard.bind(this)}
              onDelete={this.deleteSearchCard.bind(this)}
              onContentChange={this.updateSearchCardContent.bind(this)}
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