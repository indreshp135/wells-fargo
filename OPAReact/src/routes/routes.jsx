import React from 'react';
import { HomePageContainer } from '../containers/HomePageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';

export const publicRoutes = [

  {
    url: '/auth',
    component: AuthPageContainer,
    name: 'AuthPageContainer'
  }
];

export const privateRoutes = [
  {
    url: '/',
    component: <HomePageContainer />,
    name: 'HomePageContainer'
  }
];
