import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { Card, Button } from "rebass";
import { Label, Input } from "@rebass/forms";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './create.css';


const CreateAccount = () => {
  const [goToLogin, setGoToLogin] = useState(false);
  const [created, setCreated] = useState(false);
  const [onyen, setOnyen ] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [address, setAddress] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();
    const opts = {
        headers: {
          Authorization: onyen,
        },
        method: "POST",
        body: JSON.stringify({
          password: password,
          first_name: first,
          last_name: last,
          home_address: address
        }),
      };
      fetch(
        `https://bkcyx6oezl.execute-api.us-east-1.amazonaws.com/create_user`,
        opts
      )
        .then((response) => {
          if (response.status === 400) {
            throw Error("Trouble making account.");
          }
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          localStorage.setItem("onyen", onyen);
          setCreated(true);
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

  const changeFirst = (event) => {
    setFirst(event.target.value);
  };

  const changeLast = (event) => {
    setLast(event.target.value);
  };

  const changeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setGoToLogin(true);  
  };

  if (goToLogin) {
    return (<Redirect to='/login' />)
  }

  if (created) {
    return (<Redirect to="/student-center/dashboard" />);
  }


  return (
    <div id="login">
      <div className="create-container">
        <Card>
          <h1>Create Account</h1>
          <p><em>Note: This website is not properly secured and could have vulnerabilities. I recommend not using any of your sensistive information such as passwords or addresses.</em></p>
          <form>
            <div className="form-input">
              <Label htmlFor="subject">Onyen</Label>
              <Input value={onyen} onChange={changeOnyen} type="text" />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">Password</Label>
              <Input
                value={password}
                onChange={changePassword}
                type="password"
              />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">First Name</Label>
              <Input
                value={first}
                onChange={changeFirst}
                type="text"
              />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">Last Name</Label>
              <Input
                value={last}
                onChange={changeLast}
                type="text"
              />
            </div>
            <div className="form-input">
              <Label htmlFor="Password">Street Address</Label>
              <Input
                value={address}
                onChange={changeAddress}
                type="text"
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

export default CreateAccount;
