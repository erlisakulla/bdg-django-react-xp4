import React, {useEffect} from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Login from "./components/Login/Login";
import signup from "./components/SignUp/Signup";
import Instructor from "./components/Instructor/Instructor";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Player from "./components/Player/Player";
import Logout from "./helper_functions/Logout"
import CreateDemand from "./components/Demand/create_demand";
import RequireAuth from "./helper_functions/checkAuth";
import EditGame from "./components/Instructor/edit_game";
import CreateGame from "./components/Instructor/CreateGame";

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
          <Route path="/signup" exact component={signup} />
          <Route path="/login" exact component={Login} />
          <RequireAuth path="/creategame" exact component={CreateGame} />
          <RequireAuth path="/editgame/:id" exact component={EditGame} />
          <RequireAuth path="/createdemand" exact component={CreateDemand} />
          <Route path="/" exact component={LandingPage} />
          <RequireAuth path="/role/:id" exact component={Game} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/:any" exact>
            <h1 className="text-center">Page Not found</h1>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
