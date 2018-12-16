import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from "./components/navigation/Header";
// Views
import Browser from './components/views/browser/Browser';
import Wiki from './components/views/Wiki';
import About from './components/views/About';

// import './App.css';

class App extends Component {
    div;
  render() {
    return (
      <div>
        <Header/>
        <Browser/>
        <Wiki/>
        <About/>
      </div>
    );
  }
}

const styles = {

}
export default withStyles(styles)(App);
