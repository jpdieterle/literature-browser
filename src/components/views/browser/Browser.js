import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchCard from './searchcard/SearchCard';
import AddSearchCardButton from './buttons/AddSearchCardButton';
import SelectFormat from './SelectFormat';
import SearchButton from './buttons/SearchButton';
import FullSearchButton from './buttons/FullSearchButton';
import shortid from 'shortid';
import { inspect } from 'util' // or directly

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

const inputVariant = 'standard';

class Browser extends React.Component {
  state = {
    cardList: [JSON.parse(JSON.stringify(initialSearchCardObject))],
    selectedFormats: {checkedTXT: false, checkedJSON: false, checkedXML: false},
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

    console.log(inputValues);

    let paramsPassed = (inputValues instanceof Object && 'authors' in inputValues);
    inputValues = paramsPassed?
      JSON.parse(JSON.stringify(inputValues)) : JSON.parse(JSON.stringify(initialSearchCardObject));

    inputValues.id = shortid.generate();

    this.setState(state => ({
      cardList: [...state.cardList, inputValues]
    }), () => {
      console.log('new cardList after add:' + JSON.stringify(this.state.cardList));
    });
  }

  updateSearchCardContent(id, prop, value) {
    if(this.state && this.state.cardList) {
      let newCardList = JSON.parse(JSON.stringify(this.state.cardList));
      newCardList.find(card => card.id === id)[prop] = JSON.parse(JSON.stringify(value));
      this.setState({cardList: newCardList }, () => console.log('new card list: ' + JSON.stringify(this.state.cardList)));
    }
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

  updateFormat = (formatProp, newValue) => {
    let newSelectedFormats = JSON.parse(JSON.stringify(this.state.selectedFormats));
    newSelectedFormats[formatProp] = JSON.parse(JSON.stringify(newValue));
    this.setState({selectedFormats: newSelectedFormats}, () => {console.log('new selectedFormats: '+JSON.stringify(this.state.selectedFormats))});
  };

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
              inputVariant={inputVariant}
              getIndex={this.getCardIndex.bind(this)}
              onDuplicate={this.onAddSearchCard.bind(this)}
              onDelete={this.deleteSearchCard.bind(this)}
              onContentChange={this.updateSearchCardContent.bind(this)}
            />
          ))}
        </div>
        <AddSearchCardButton action={this.onAddSearchCard.bind(this)}/>
        <div className={classes.flexContainer}>
          <SelectFormat initialValues={this.state.selectedFormats} onChange={this.updateFormat.bind(this)}/>
        </div>
        <div className={classes.flexContainer}>
          <SearchButton/>
          <FullSearchButton/>
        </div>
      </div>
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root:{
    padding: theme.spacing.unit * 3,
  },
  flexContainerCards:{
    display: 'flex',
    flexFlow: 'row wrap',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  flexContainer:{
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Browser);