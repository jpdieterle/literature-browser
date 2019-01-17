import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import InfoButton from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AuthorInput from "./searchcard/AuthorInput";
import GenreSelection from "./searchcard/GenreSelection";
import ContainsInput from "./searchcard/ContainsInput";
import TimeInput from "./searchcard/TimeInput";
import SearchCard from './searchcard/SearchCard';
import AddSearchCardButton from './buttons/AddSearchCardButton';
import SelectFormat from './SelectFormat';
import SearchButton from './buttons/SearchButton';
import shortid from 'shortid';
import axios from 'axios';


const minYear = '1700';
const maxYear = '1950';

const initialSearchCardObject = {
  id: shortid.generate(),
  authors: [],
  genres: [],
  keywords: '',
  timeFrom: minYear,
  timeTo: maxYear,
};

const inputVariant = 'standard';

class Browser extends React.PureComponent {
  state = {
    cardList: [JSON.parse(JSON.stringify(initialSearchCardObject))],
    selectedFormats: {checkedTXT: false, checkedJSON: false, checkedXML: false},
    loading: false,
    error: false,
    resultsIn: false,
  };

  // TODO: set request URL
  requestUrl = '';
  testUrl='';

  getCardIndex = id => {
    return this.state.cardList.findIndex(card => card.id === id);
  };

  getLoading = () => {
    return this.state.loading;
  };

  setLoading = (isLoading) => {
    this.setState({loading: isLoading});
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // fügt eine neue Teil-Suche hinzu
  onAddSearchCard = inputValues => {

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
  };

  onDuplicateSearchCard = id => {
    this.onAddSearchCard(this.state.cardList.find(card => card.id === id));
  };

  updateSearchCardContent = (id, prop, value) => {
    if(this.state && this.state.cardList) {
      let newCardList = JSON.parse(JSON.stringify(this.state.cardList));
      console.log('render browser' , newCardList);

      newCardList.find(card => card.id === id)[prop] = JSON.parse(JSON.stringify(value));
      this.setState({cardList: newCardList });
    }
  };

  deleteSearchCard = id => {
    if(this.state.cardList.length === 1) {
      return; // letzte verbleibende Karte soll nicht gelöscht werden
    }
    this.setState(state => ({
      cardList: state.cardList.filter( card => (card.id !== id))
    }));
  };

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
    this.setState({loading: false});
    this.renderResponseData();
  };

  handleGetAll = () => {
    this.setState({loading: true});
    // TODO: HTTP request => whole corpus
    axios.get('https://jsonplaceholder.typicode.com/todos',); // add criteria as payload!
    this.setState({loading: false});
    this.renderResponseData();
  };

  renderResponseData = data => {
    // TODO: render download link/icon/button after response from server has arrived
  };

  render() {
    const { classes } = this.props;
    const { cardList } = this.state;

    return(
      <div className={classes.root}>
        <Paper className={classes.infoBox}>
          <InfoButton color={"primary"} className={classes.infoIcon}/>
          <Typography color={"primary"}>
            Schränken Sie die Suche ein, indem Sie eines oder mehrere Kriterien innerhalb einer Teil-Suche (=Kasten) eingeben.
            Teil-Suchen werden zu einer Such-Anfrage kombiniert, sodass Sie mehr Texte mit einer Such-Abfrage erhalten können.
          </Typography>
        </Paper>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className={classes.cardContainer}>
            {cardList.map((card, index, cardList) => (
              <SearchCard
                key={card.id} // not passed to component by react! => use id instead
                id={card.id}
                getIndex={this.getCardIndex}
                getDisabled={this.getLoading}
                onDuplicate={this.onDuplicateSearchCard}
                onDelete={this.deleteSearchCard}
              >
                <AuthorInput
                  key={card.id + '-authors'}
                  cardId={card.id}
                  variant={inputVariant}
                  initialValues={card.authors}
                  autofocus={(index === cardList.length-1)}
                  disabled={this.getLoading()}
                  onInputChange={this.updateSearchCardContent}
                />
                <GenreSelection
                  key={card.id + '-genres'}
                  cardId={card.id}
                  variant={inputVariant}
                  initialValues={card.genres}
                  disabled={this.getLoading()}
                  onInputChange={this.updateSearchCardContent}
                />
                <ContainsInput
                  key={card.id + '-keywords'}
                  cardId={card.id}
                  variant={inputVariant}
                  initialValue={card.keywords}
                  disabled={this.getLoading()}
                  onInputChange={this.updateSearchCardContent}
                />
                <TimeInput
                  key={card.id + '-time'}
                  cardId={card.id}
                  variant={inputVariant}
                  initialTimeFrom={card.timeFrom}
                  initialTimeTo={card.timeTo}
                  disabled={this.getLoading()}
                  onInputChange={this.updateSearchCardContent}
                />
              </SearchCard>
            ))}
          </div>
          <AddSearchCardButton action={this.onAddSearchCard} getDisabled={this.getLoading}/>
          <div className={classes.flexContainer}>
            <SelectFormat
              initialValues={this.state.selectedFormats}
              getDisabled={this.getLoading}
              onChange={this.updateFormat}
            />
          </div>
          <div className={classes.flexContainer}>
            <SearchButton
              type={'submit'} // form gets submitted when clicking on this button
              variant={'search'}
              getLoading={this.getLoading}
              handleSubmit={this.handleSubmit}
            />
            <SearchButton
              getLoading={this.getLoading}
              handleSubmit={this.handleGetAll}
            />
          </div>
        </form>
        <div className={classes.flexContainer}>
          {this.state.loading && <CircularProgress className={classes.loadingAnimation} />}
          {!this.state.loading && this.state.resultsIn}
          {!this.state.loading && this.state.error}
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
  infoBox:{
    minWidth: 400,
    maxWidth: 800 + theme.spacing.unit*7,
    padding: 20,
    display: 'flex',
    margin: theme.spacing.unit,
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
  cardContainer:{
    display: 'flex',
    flexFlow: 'row wrap',
    //flexDirection: 'row-reverse',
    //justifyContent: 'flex-end',
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