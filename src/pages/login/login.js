import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { Card, Button } from "rebass";
import { Label, Input } from "@rebass/forms";
// import { Auth } from "aws-amplify";
// import { useAuth } from '../../context/auth.js';

import "./login.css";

const Login = () => {
  const [goToCreate, setGoToCreate] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("onyen") !== undefined && localStorage.getItem("onyen") !== null && localStorage.getItem("onyen") !== "");
  const [onyen, setOnyen] = useState("");
  const [password, setPassword] = useState("");
  // const { setAuthTokens } = useAuth();

  if (goToCreate) {
    return (<Redirect to='/create' />)
  }

  const handleCreate = (e) => {
    e.preventDefault();
    setGoToCreate(true);  
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (onyen.length === 0) return;
    if (password.length === 0) return;
    const opts = {
        headers: {
          Authorization: onyen,
        },
        method: "POST",
        body: JSON.stringify({
          password: password,
        }),
      };
      fetch(
        `https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/login`,
        opts
      )
        .then((response) => {
          if (response.status === 400) {
            throw Error("Wrong Onyen or Password");
          }
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          localStorage.setItem("onyen", onyen);
          setLoggedIn(true);
        })
        .catch((error) => {
          alert(error);
        });

  };

  const changeOnyen = (event) => {
    setOnyen(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  if (isLoggedIn) {
    return (
      <Redirect to="/student-center/dashboard" />
    );
  }

  return (
    <div id="login">
      <div className="login-container">
        <Card>
          <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <div className="form-input">
            <Label htmlFor='Onyen'>Onyen</Label>
      <Input
        value={onyen}
        onChange={changeOnyen}
        type="text"
      />
            </div>
            <div className="form-input">
            <Label htmlFor='Password'>Password</Label>
      <Input
        value={password}
        onChange={changePassword}
        type="password"
      />
             
            </div>

            <br />
            <Button style={{marginRight: "10px"}} type="submit" onClick={handleLogin}>
              Login
            </Button>
            
            <Button style={{marginLeft: "10px"}} onClick={handleCreate}>
              Create Account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
