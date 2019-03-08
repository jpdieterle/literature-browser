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

// max. number of search cards that can be added by user
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
    responseFiles: '',
    hits: 0,
    responseIn: false,
    error: false,
    errorMessage: 'no error',
    timeError: false,
    keywordError: false,
    formatError: true,
    searchID: 0,
  };

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

  // add new search card
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

  // duplicate existing search card with content
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

  // see if user is still logged in
  requestStatus = func => {
    // check if session is still valid otherwise logout user
    fetch("/backend/lib/sessionManagement.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginStatus: true,
        loginID: this.props.sessionID
      })
    }).then(response => {
        if(response.ok) {
          response.json().then(data => {
            if(!data || data.status === 'error') {
              this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error');
              this.props.handleAppChange('loggedIn', false);
              this.props.handleAppChange('isAdmin', false);
            } else {
              func();
            }
          });
        } else {
          this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error');
          this.logout();
        }
      }
    ).catch(error => {
        this.context.handleNotificationChange(true, 'Ihre Sitzung ist abgelaufen.', 'sessionCheck', 'error', 404);
        this.logout();
      }
    );
  };

  // submit search with or without criteria
  handleSubmit = (getAll) => {
    // check for errors before sending request
    if ((!getAll && (this.state.timeError || this.state.keywordError)) || this.state.formatError) {
      this.setState({
        error: true,
        errorMessage: 'Sie können keine Anfrage mit fehlenden/falschen Eingaben abschicken',
      });
      this.context.handleNotificationChange(true, 'Sie können keine Anfrage mit fehlenden/falschen Eingaben abschicken', 'login', 'error');
      return;
    }

    const payload = getAll ? {getAll: true} : {cards: this.state.cardList};

    // start loading animation, disable forms
    this.setState({
      loading: true,
      error: false,
      responseIn: false,
      responseFiles: [],
    });

    // request data + handle response
    fetch("/backend/lib/functions.php", {
      method: 'POST',
      credentials: 'same-origin', // allow cookies -> session management
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            if (data && data.status && data.status === 'success') {
              // search succeeded (there are results)
              this.setState({
                responseFiles: data.filenames, // array of filenames separated by comma
                hits: data.hits, // number
                responseIn: true,
                searchID: shortid.generate(),
              });
            } else {
              // server error / search not possible on server
              this.setState({
                errorMessage: 'Es ist ein Fehler auf dem Server aufgetreten.',
                error: true
              });
              this.context.handleNotificationChange(true, 'Es ist ein Fehler auf dem Server aufgetreten. Die Anfrage wurde abgebrochen.', 'search', 'error');
            }
          });
        } else {
          // other problem
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
        this.context.handleNotificationChange(true, error.message, 'search', 'error', 404)
      });
    this.setState({loading: false});
  };

  // do search with criteria entered by user
  handleSearchCriteria = () => {
    this.requestStatus(() => this.handleSubmit(false));
  };

  // do search not regarding criteria that might have been entered by user
  handleGetAll = () => {
    this.requestStatus(() => this.handleSubmit(true));
  };

  render() {
    const { classes, authorsList, minYear, maxYear, genres } = this.props;
    const { cardList, selectedFormats, responseFiles, responseIn, loading, hits, searchID} = this.state;

    const renderResponseData = () => {
      let formats = selectedFormats.checkedJSON? ['json'] : [];
      if(selectedFormats.checkedTXT) formats.push('txt');
      return <Results filenames={responseFiles} number={hits} formats={formats} searchID={searchID}/>;
    };

    return(
      <div className={classes.root}>
        <Paper className={classes.infoBox}>
          <InfoButton color={"primary"} className={classes.infoIcon}/>
          <Typography color={"primary"}>
            Schränken Sie die Suche ein, indem Sie eines oder mehrere Kriterien innerhalb einer Teil-Suche (=Kasten) eingeben.
            Teil-Suchen werden zu einer Such-Anfrage kombiniert, sodass Sie mehr Texte mit einer Suche erhalten können.
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
          {responseIn && renderResponseData()}
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
  handleAppChange: PropTypes.func.isRequired,
  sessionID: PropTypes.any.isRequired,
};

Browser.contextType = NotificationContext;

const styles = theme => ({
  root:{
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 4,
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