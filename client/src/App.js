import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga";

import Routes from "./routes";
import store from "./store";

import axios from "axios";

// import { getProfile } from "./actions/profileActions";

ReactGA.initialize("UA-144467595-1");
ReactGA.pageview("/");

// store.dispatch(getMovieData());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
