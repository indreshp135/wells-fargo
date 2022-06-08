import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { publicRoutes, privateRoutes } from './routes';

import { ScrollToTopController } from '../components/ScrollToTopController';
import { NavBar } from '../components/NavBar';
import { getUserDetails } from '../requests';
// import { Footer } from "../components/Footer";
// import { Page404 } from "../components/Page404";

export function Routes() {
  return (
    <Router>
      <NavBar />
      <ScrollToTopController />
      <Switches />
      {/* <Footer /> */}
    </Router>
  );
}

function Switches() {
  return (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          exact
          component={route.component}
          path={route.url}
          key={route.url}
        />
      ))}
      { privateRoutes.map((route) => (
        <PrivateRoute
          exact
          path={route.url}
          key={route.url}
        >
          {route.component}
        </PrivateRoute>
      ))}
      {/* <Route component={Page404} /> */}
    </Switch>
  );
}

function PrivateRoute({
  children, exact, path
}) {
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(async () => {
    if (sessionStorage.getItem('Token')) {
      const res = await getUserDetails();
      if (res.status !== 200) {
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (loggedIn ? (
        children
      ) : (
        <Redirect to="/auth" />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};
