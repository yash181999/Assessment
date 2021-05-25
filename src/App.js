import React from "react";
import "./App.css";
import { auth } from "./fireabse";
import Signup from "./Views/Signup";
import Login from "./Views/Login";
import Home from "./Views/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);
  const history = useHistory();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = '/signup'>{!user && <Signup />}</Route>
          <Route path="/">{user ? <Home /> : <Login />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
