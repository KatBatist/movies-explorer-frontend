import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import mainApi from '../../utils/MainApi';

function ProtectedRoute({ component: Component, ...props }) {

  const [auth, setAuth] = React.useState(false);
  const [isTokenValidated, setIsTokenValidated] = React.useState(false);

  React.useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (token) {
      mainApi.checkToken(token)
      .then((res) => {
        setAuth(true);
        setIsTokenValidated(true);
      })
      .catch((err) => {
        setAuth(false);
        localStorage.removeItem("jwt");
        setIsTokenValidated(true);
      })
    } else {
       setIsTokenValidated(true);
    }
  }, [])

  if (!isTokenValidated) return <div />;
  if (props.redirectAuth) {
    return (
      <Route>
        { auth ? <Redirect to='/' /> : <Component { ...props } />}
      </Route>
  )
    }
  return (
    <Route>
      { auth ? <Component { ...props } /> : <Redirect to='/' />}
    </Route>
  )
}

export default ProtectedRoute;