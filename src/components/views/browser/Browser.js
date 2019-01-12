import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchCard from './searchcard/SearchCard';
import AddSearchCardButton from './buttons/AddSearchCardButton';
import SelectFormat from './SelectFormat';
import SearchButton from './buttons/SearchButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import shortid from 'shortid';
import axios from 'axios';

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
    loading: false,
    error: false,
    resultsIn: false,
  };

  // TODO: set request URL
  requestUrl = '';

  getCardIndex = id => {
    return this.state.cardList.findIndex(card => card.id === id);
  };

  getLoadingStatus = () => {
    return this.state.loading;
  };

  handleChange = name => event => {
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
    inputValues = paramsPassed?
      JSON.parse(JSON.stringify(inputValues)) : JSON.parse(JSON.stringify(initialSearchCardObject));

    inputValues.id = shortid.generate();

    this.setState(state => ({
      cardList: [...state.cardList, inputValues]
    }));
  }

  updateSearchCardContent(id, prop, value) {
    if(this.state && this.state.cardList) {
      let newCardList = JSON.parse(JSON.stringify(this.state.cardList));
      newCardList.find(card => card.id === id)[prop] = JSON.parse(JSON.stringify(value));
      this.setState({cardList: newCardList });
    }
  }

  deleteSearchCard(id) {
    if(this.state.cardList.length === 1) {
      return; // letzte verbleibende Karte soll nicht gelöscht werden
    }
    this.setState(state => ({
      cardList: state.cardList.filter( card => (card.id !== id))
    }));
  }

  updateFormat = (formatProp, newValue) => {
    let newSelectedFormats = JSON.parse(JSON.stringify(this.state.selectedFormats));
    newSelectedFormats[formatProp] = JSON.parse(JSON.stringify(newValue));
    this.setState({selectedFormats: newSelectedFormats});
  };

  handleSubmit = () => {
    this.setState({loading: true});
    // TODO: HTTP request => get texts according to criteria
    let payload = JSON.parse(JSON.stringify(this.state.cardList)); // => save state
    let formats = this.state.selectedFormats;
    axios.post(this.requestUrl, payload);
    axios.get('https://jsonplaceholder.typicode.com/todos',); // add criteria as payload!
    this.setState({loading: false});
    this.renderResponseData();
  };

  handleGetAll = () => {
    this.setState({loading: true});
    // TODO: HTTP request => whole corpus
    this.setState({loading: false});
    this.renderResponseData();
  };

  renderResponseData = (data) => {
    // TODO: hide waiting animation
    // TODO: render download link/icon/button after response from server has arrived (after animation stopped)
  };

  render() {
    const { classes } = this.props;
    const { cardList } = this.state;

    return(
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
                getDisabled={this.getLoadingStatus.bind(this)}
                onDuplicate={this.onAddSearchCard.bind(this)}
                onDelete={this.deleteSearchCard.bind(this)}
                onContentChange={this.updateSearchCardContent.bind(this)}
              />
            ))}
          </div>
          <AddSearchCardButton action={this.onAddSearchCard.bind(this)} getDisabled={this.getLoadingStatus.bind(this)}/>
          <div className={classes.flexContainer}>
            <SelectFormat
              initialValues={this.state.selectedFormats}
              getDisabled={this.getLoadingStatus.bind(this)}
              onChange={this.updateFormat.bind(this)}
            />
          </div>
          <div className={classes.flexContainer}>
            <SearchButton
              type={'submit'} // form gets submitted when clicking on this button
              variant={'search'}
              getDisabled={this.getLoadingStatus.bind(this)}
            />
            <SearchButton
              getDisabled={this.getLoadingStatus.bind(this)}
              onClick={this.handleGetAll.bind(this)}
            />
          </div>
        </form>
        <div className={classes.flexContainer}>
          {this.state.loading && <CircularProgress className={classes.loadingAnimation} />}
          {!this.state.loading && this.state.resultsIn}
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
  loadingAnimation:{
    marginLeft: theme.spacing.unit,
  },
});

export default withStyles(styles)(Browser);