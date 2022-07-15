import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ ...props }) {
  return <Route>{props.redirect ? <Redirect to={props.redirectPath} /> : props.children}</Route>;
}

export default ProtectedRoute;

