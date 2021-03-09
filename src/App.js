import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import About from "./pages/About";
import Game from './pages/Game';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/game" exact component={Game} />
          <Route path="/about" exact component={About} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
