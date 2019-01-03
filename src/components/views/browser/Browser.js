import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchCard from "./SearchCard";
import AddSearchCardButton from "./AddSearchCardButton";
import SearchButton from "./SearchButton";
import SelectFormat from "./SelectFormat";

const minYear = 1700;
const maxYear = 1950;

const emptySearchCardObject = {
  authors: [],
  genres: [],
  keywords: '',
  timeFrom: minYear,
  timeTo: maxYear,
};

class Browser extends React.Component {
  state = {
    cardList: [emptySearchCardObject],
  };



  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  deleteSearchCard() {
    // TODO: remove card object from state
  }

  // fügt eine leere Karte oder ein Duplikat einer Karte hinzu
  onAddSearchCard(authors, genres, keywords, timeFrom, timeTo) {
    if(this.state && this.state.cardList.length > 8 ) {
      // TODO: Hinweis anzeigen, dass nicht mehr als 8 Karten hinzugefügt werden können.
      return;
    }
    // initialisiere leere Karte, falls keine Werte übergeben werden
    let newCardObject = emptySearchCardObject;

    // setze Karte auf übergebene Werte
    if(authors) {
      newCardObject.key = 'sc-' + (this.state.cardList.length + 2).toString();
      newCardObject.authors = authors;
      newCardObject.genres = genres;
      newCardObject.keywords = keywords;
      newCardObject.timeFrom = timeFrom;
      newCardObject.timeTo = timeTo;
    }
    // füge neue Karte hinzu
    this.state.cardList.concat(newCardObject);
  }

  render() {
    const { classes } = this.props;
    const { cardList } = this.state;

    return(
      <div className={classes.root}>
        <div className={classes.flexContainerCards}>
          {cardList.map((card, index) => (
            <SearchCard
              key={'sc-' + index.toString()}
              inputValues={card}
              index={index}
              onDuplicate={this.onAddSearchCard.bind(this)}
              onDelete={this.deleteSearchCard.bind(this)}
              onChange={this.handleChange.bind(this)}
            />
          ))}
        </div>
        <AddSearchCardButton action={this.onAddSearchCard()}/>
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