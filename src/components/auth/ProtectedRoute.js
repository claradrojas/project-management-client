//is a component where we receive props

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute ({ component: Component, user, ...rest }) {
  console.log({ component: Component, user, rest });

  if (user) { //this comes from the state, we check if there is an user, if not we redirect
    return <Route {...rest} render={routeProps => <Component {...routeProps} userData={user} />} />;
  } else {
    return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />;
  }
};

export default ProtectedRoute;

// <component is coming from the app.js component inside protected route, 
//the userdata takes the value of parent app.js <protectedroute, if user is logged in we see details, if not is redirected to HP