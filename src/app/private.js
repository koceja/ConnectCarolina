import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import { useAuth } from '../context/auth';

const PrivateRoute = (props) => {
    // const isAuthed = useAuth();
    const isAuthed = (localStorage.getItem("onyen") !== undefined && localStorage.getItem("onyen") !== null && localStorage.getItem("onyen") !== "");

    return (
        <Route exact path={props.path}>
            {(isAuthed) ? props.component : <Redirect to="/login" />}
        </Route>
    )
}

export default PrivateRoute;