import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';

// import { AuthContext } from '../context/auth.js';
import PrivateRoute from './private.js';

import Home from '../pages/home/home.js';
import Login from '../pages/login/login.js';
import CreateAccount from '../pages/login/create.js';
import Dashboard from '../pages/student-center/dashboard/dashboard.js';
import Academics from '../pages/student-center/academics/academics.js';
import Search from '../pages/student-center/academics/search/search.js';
import Enroll from '../pages/student-center/academics/enroll/enroll.js';
import Financial from '../pages/student-center/financial/financial.js';
import Personal from '../pages/student-center/personal/personal.js';
import ClassMaker from '../pages/api/classes.js';


import './app.css';

function App() {
  // const tokens = JSON.parse(localStorage.getItem("tokens"));
  // const [authTokens, setAuthTokens] = useState(tokens);

  // const setTokens = (data) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // }

  return (
    <ThemeProvider theme={theme}>
      <div id="app">
        {/* <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}> */}
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/create">
                <CreateAccount />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              
              <PrivateRoute path="/student-center/dashboard" component={<Dashboard />} />
              <PrivateRoute path="/student-center/academics/search" component={<Search />} />
              <PrivateRoute path="/student-center/academics/enroll" component={<Enroll />} />
              <PrivateRoute path="/student-center/academics" component={<Academics />} />
              <PrivateRoute path="/student-center/financial" component={<Financial />} />
              <PrivateRoute path="/student-center/personal" component={<Personal />} />
              <PrivateRoute path="/api" component={<ClassMaker />} />
            </Switch>
          </BrowserRouter>
        {/* </AuthContext.Provider> */}
        
      </div>
    </ThemeProvider>
  );
}

export default App;
