import React, { useEffect, useState } from "react";
import "./Signup.css";
import login from "../login.svg";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { auth, db, provider } from "../fireabse";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [user] = useAuthState(auth);

  const signInWithGoogle = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then(() => {
        history.replace("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    //do some fancy firebase registerx

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          if (auth != null) {
            db.collection("Users")
              .doc(user.uid)
              .set({
                uid: user.uid,
                name: name,
                email: email,
              })
              .then(() => {
                history.replace("/");
              })
              .catch((e) => setErrorMessage(e.message));
          }
        }
      })
      .catch((error) => setErrorMessage(error.message));

    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, [6000]);
  }, [errorMessage]);

  return (
    <div className="signup">
      <img className="signup__image" src={login}></img>
      <div className="signup__form">
        <h1>Signup</h1>
        {errorMessage && <div className="error__message">{errorMessage}</div>}
        <form>
          <label>Full Name*</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          ></input>
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
            <Button onClick={register} fullWidth>
              signup
            </Button>
          )}
          {loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          )}
          {!loading && (
            <Grid container>
              <Grid item>
                <Link onClick={() => history.replace("/login")}>
                  Already have an account sign in
                </Link>
              </Grid>
            </Grid>
          )}
        </form>
        <br></br>
        {!loading && (
          <>
            <p
              style={{
                textAlign: "center",
                marginBottom: "10px",
                color: "gray",
              }}
            >
              Or
            </p>
            <Button
              onClick={signInWithGoogle}
              fullWidth
              style={{ backgroundColor: "#31a350", color: "white" }}
            >
              signup With Google
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
