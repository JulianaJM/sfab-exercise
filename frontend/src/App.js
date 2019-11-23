import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Models from "./components/card/CardList";

import "./App.scss";

const App = () => (
  <div className="app">
    <Header />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/likes">
        <Models />
      </Route>
      <Route path="/models">
        <Models />
      </Route>
    </Switch>
  </div>
);

export default App;
