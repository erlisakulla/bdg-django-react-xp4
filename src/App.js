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
import Player from "./pages/player";
import Logout from "./pages/Logout"
import CreateDemand from "./pages/create_demand";
import axiosInstance from "./axios";
import RequireAuth from "./helper_functions/checkAuth";
import GameDetails from "./pages/game_details";
import EditGame from "./pages/edit_game";
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
          <RequireAuth path="/instructor" exact component={Instructor} />
          <RequireAuth exact path="/player" component={Player}/>
            {/* <Route path="/player" exact component={Player}/> */}
          
          <Route path="/signup" exact component={signup} />
          <Route path="/login" exact component={Login} />
          <RequireAuth path="/creategame" exact component={EditGame} />
          <RequireAuth path="/game/:id" exact component={GameDetails} />
          <RequireAuth path="/editgame/:id" exact component={EditGame} />
          <RequireAuth path="/createdemand" exact component={CreateDemand} />

          <Route path="/" exact component={LandingPage} />

          <RequireAuth path="/play/:id" exact component={Game} />
          <Route path="/logout" exact component={Logout} />

          <Route path="/about" exact component={About} />
          <Route path="/:any" exact>
            <h1 className="text-center">Page Not found</h1>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
