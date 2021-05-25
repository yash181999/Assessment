import React, { useEffect, useState } from "react";
import "./Login.css";
import login from "../login.svg";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth, provider } from "../fireabse";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [user] = useAuthState(auth);

  const signInWithGoogle = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => {
      setErrorMessage(error.message);
    });
  };

  const signIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    //do some firebase login
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.replace("/");
        }
      })
      .catch((error) => setErrorMessage(error.message));
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
      setPassword("");
      setEmail("");
    }, [4000]);
  }, [errorMessage]);

  return (
    <div className="login">
      <img className="login__image" src={login}></img>
      <div className="login__form">
        <h1>Login</h1>
        {errorMessage && <div className="error__message">{errorMessage}</div>}
        <form>
          <label>Email*</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          ></input>
          <label>Password*</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          ></input>
          {!loading && (
            <Button onClick={signIn} fullWidth>
              Login
            </Button>
          )}
          {loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress style={{ color: "#31a350" }} />
            </div>
          )}
          {!loading && (
            <Grid container>
              <Grid item>
                <Link onClick={() => history.replace("/signup")}>
                  {"Dont't have a account singup"}
                </Link>
              </Grid>
            </Grid>
          )}
        </form>
        <br></br>
        <p style={{ textAlign: "center", marginBottom: "10px", color: "gray" }}>
          Or
        </p>
        {!loading && (
          <Button
            fullWidth
            onClick={signInWithGoogle}
            style={{ backgroundColor: "#31a350", color: "white" }}
          >
            Login With Google
          </Button>
        )}
      </div>
    </div>
  );
}

export default Login;
