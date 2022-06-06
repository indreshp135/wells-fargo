import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { ScrollToTopController } from '../components/ScrollToTopController';
// import { Footer } from "../components/Footer";
// import { NavBar } from "../components/NavBar";
// import { Page404 } from "../components/Page404";

export function Routes() {
  return (
    <Router>
      {/* <NavBar /> */}
      <ScrollToTopController />
      <Switch>
        {publicRoutes.map((route) => (
          <Route
            exact
            component={route.component}
            path={route.url}
            key={route.url}
          />
        ))}
        {/* { loggedIn && privateRoutes.map((route) => (
          <Route
            exact
            component={route.component}
            path={route.url}
            key={route.url}
          />
        ))} */}
        {/* <Route component={Page404} /> */}
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}
