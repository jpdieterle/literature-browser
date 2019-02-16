import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import InfoButton from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import NotificationContext from '../../notifications/NotificationContext';
import AuthorInput from "./searchcard/AuthorInput";
import GenreSelection from "./searchcard/GenreSelection";
import ContainsInput from "./searchcard/ContainsInput";
import TimeInput from "./searchcard/TimeInput";
import SearchCard from './searchcard/SearchCard';
import AddSearchCardButton from './buttons/AddSearchCardButton';
import SelectFormat from './SelectFormat';
import SearchButton from './buttons/SearchButton';
import Results from './results/Results';
import shortid from 'shortid';

// MUI variant of input fields inside browser
const inputVariant = 'standard';
const maxCards = 4;

class Browser extends React.PureComponent {

  initialSearchCardObject = {
    id: shortid.generate(),
    authors: [],
    genres: [],
    keywords: '',
    timeFrom: this.props.minYear,
    timeTo: this.props.maxYear,
  };

  state = {
    cardList: [JSON.parse(JSON.stringify(this.initialSearchCardObject))],
    selectedFormats: {checkedTXT: false, checkedJSON: false},
    loading: false,
    responseCode: 0, // 200 = results in
    responseData: null,
    responseIn: false,
    error: false,
    errorMessage: 'no error',
    timeError: false,
    keywordError: false,
    formatError: true,
  };

  // TODO: set request URL
  requestUrl = '';
  testUrl='https://jsonplaceholder.typicode.com/posts';

  getCardIndex = id => {
    return this.state.cardList.findIndex(card => card.id === id);
  };

  getLoading = () => {
    return this.state.loading;
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // fügt eine neue Teil-Suche hinzu
  onAddSearchCard = inputValues => {

    if(this.state && this.state.cardList.length >= maxCards ) {
      this.context.handleNotificationChange(true, `Ihre Anfrage enthält bereits ${maxCards} Teilsuchen.`, 'addCard', 'error');
      return;
    }

    let paramsPassed = (inputValues instanceof Object && 'authors' in inputValues);
    inputValues = paramsPassed?
      JSON.parse(JSON.stringify(inputValues)) : JSON.parse(JSON.stringify(this.initialSearchCardObject));

    inputValues.id = shortid.generate();

    this.setState(state => ({
      cardList: [...state.cardList, inputValues]
    }), () => {
      if(this.state.cardList.length === maxCards) {
        this.context.handleNotificationChange(true, `Sie können max. ${maxCards} Teilsuchen erstellen.`, 'addCard', 'warning');
      }
    });
  };

  onDuplicateSearchCard = id => {
    this.onAddSearchCard(this.state.cardList.find(card => card.id === id));
  };

  updateSearchCardContent = (id, prop, value) => {
    if(this.state && this.state.cardList) {
      let newCardList = JSON.parse(JSON.stringify(this.state.cardList));

      newCardList.find(card => card.id === id)[prop] = JSON.parse(JSON.stringify(value));
      this.setState({cardList: newCardList });
    }
  };

  deleteSearchCard = id => {
    // last remaining card should not be deleted => warning
    if(this.state.cardList.length === 1) {
      this.context.handleNotificationChange(true, 'Ihre Anfrage muss min. 1 Teil-Suche enthalten.', 'deleteCard', 'warning');
      return;
    }
    this.setState(state => ({
      cardList: state.cardList.filter( card => (card.id !== id))
    }));
  };

  // update list of selected formats for results (txt, json)
  updateFormat = (formatProp, newValue) => {
    let newSelectedFormats = JSON.parse(JSON.stringify(this.state.selectedFormats));
    newSelectedFormats[formatProp] = JSON.parse(JSON.stringify(newValue));
    this.setState({selectedFormats: newSelectedFormats});
  };

  handleSubmit = (getAll) => {

    // check for errors before sending request
    if(this.state.timeError || this.state.keywordError || this.state.formatError) {
      this.setState({
        error: true,
        errorMessage: 'Sie können keine Anfrage mit fehlenden/falschen Eingaben abschicken',
      });
      return;
    }

    // start loading animation, disable forms
    this.setState({
      loading: true,
      responseCode: 0,
      error: false,
      responseIn: false,
      responseData: {},
    });

    // combine data to send
    let payload = {formats:{txt: this.state.selectedFormats.checkedTXT, json: this.state.selectedFormats.checkedJSON}};
    if (!getAll) {
      payload.cardList = this.state.cardList;
    }

    // request data + handle response
    fetch("/backend/lib/functions.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({cards: payload, getAll: getAll})
    })
      .then(response => {
        this.setState({responseCode: response.status});
        if(response.ok) {
          if(response.headers.get("content-type").indexOf("application/json") !== -1) {
            response.json().then(data => {
              this.setState({
                responseData: JSON.stringify(data),
                responseIn: true,
              });
              console.log(response.json);
            });
          }
        } else {
          this.setState({
            errorMessage: response.statusText,
            error: true
          });
          this.context.handleNotificationChange(true, response.statusText, 'search', 'error', response.statusCode)
        }
      })
      .catch(error => {
        this.setState({
          errorMessage: error.message,
          error: true
        });
        this.context.handleNotificationChange(true, error.message, 'search', 'error')
      });
    this.setState({loading: false});
  };

  // do search with criteria entered by user
  handleSearchCriteria = () => {
    this.handleSubmit(false);
  };

  // do search not regarding criteria that might have been entered by user
  handleGetAll = () => {
    this.handleSubmit(true);
  };

  render() {
    const { classes, authorsList, minYear, maxYear, genres } = this.props;
    const { cardList, selectedFormats, responseData, responseIn, responseCode, loading} = this.state;

    const renderResponseData = (data, getAll) => {
      console.log(data);

      return <Results data={data} numberOfResults={data.number || undefined}/>;
    };

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
                  authorsList={authorsList}
                  autofocus={(index === cardList.length-1)}
                  disabled={this.getLoading()}
                  onInputChange={this.updateSearchCardContent}
                />
                <GenreSelection
                  key={card.id + '-genres'}
                  cardId={card.id}
                  genres={genres}
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
                  handleBrowserChange={this.handleChange}
                />
                <TimeInput
                  key={card.id + '-time'}
                  cardId={card.id}
                  variant={inputVariant}
                  initialTimeFrom={card.timeFrom}
                  initialTimeTo={card.timeTo}
                  disabled={this.getLoading()}
                  onInputChange={this.updateSearchCardContent}
                  minYear={minYear}
                  maxYear={maxYear}
                  handleBrowserChange={this.handleChange}
                />
              </SearchCard>
            ))}
          </div>
          <AddSearchCardButton action={this.onAddSearchCard} getDisabled={this.getLoading}/>
          <div className={classes.flexContainer}>
            <SelectFormat
              initialValues={selectedFormats}
              getDisabled={this.getLoading}
              onChange={this.updateFormat}
              handleBrowserChange={this.handleChange}
            />
          </div>
          <div className={classes.flexContainer}>
            <SearchButton
              type={'submit'} // form gets submitted when clicking on this button
              variant={'search'}
              getLoading={this.getLoading}
              handleSubmit={this.handleSearchCriteria}
            />
            <SearchButton
              getLoading={this.getLoading}
              handleSubmit={this.handleGetAll}
            />
          </div>
        </form>
        <div className={classes.flexContainer}>
          {loading && <CircularProgress className={classes.loadingAnimation} />}
          {responseIn && (Math.floor(responseCode/100) === 2) &&
            renderResponseData(responseData)}
        </div>
      </div>
    );
  }
}

Browser.propTypes = {
  classes: PropTypes.object.isRequired,
  authorsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  minYear: PropTypes.string.isRequired,
  maxYear: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
};

Browser.contextType = NotificationContext;

const styles = theme => ({
  root:{
    paddingLeft: theme.spacing.unit * 3,
  },
  infoBox:{
    minWidth: 400,
    maxWidth: 800 + theme.spacing.unit*7,
    padding: 20,
    display: 'flex',
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
  infoIcon: {
    marginRight: theme.spacing.unit,
  },
  cardContainer:{
    display: 'flex',
    flexFlow: 'row wrap',
  },
  flexContainer:{
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
  },
  cardWarning:{
    margin: theme.spacing.unit,
  },
  loadingAnimation:{
    marginLeft: theme.spacing.unit,
  },
});

export default withStyles(styles)(Browser);