import React, { useEffect } from "react";
import "./App.css";
import About from "./pages/About";
import Game from "./pages/Game";
import Login from "./pages/Login";
import signup from "./pages/Signup";
import Instructor from "./pages/Instructor";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Player from "./pages/Player";
import Logout from "./pages/Logout"
import CreateGame from "./pages/CreateGame"
function App() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <div className="App ">
        <Nav> </Nav>

        <Switch>
          <Route path="/Instructor" exact component={Instructor} />
          <Route path="/player" exact component={Player} />

          <Route path="/signup" exact component={signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/creategame" exact component={CreateGame} />

          <Route path="/" exact component={LandingPage} />

          <Route path="/play" exact component={Game} />
          <Route path="/logout" exact component={Logout} />

          <Route path="/about" exact component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
