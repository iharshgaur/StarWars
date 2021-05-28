import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Person from "./pages/Person";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import StarfieldAnimation from "react-starfield-animation";

import "./App.css";

function App() {
  return (
    <>
      <StarfieldAnimation
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/person/:id">
              <Person />
            </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
