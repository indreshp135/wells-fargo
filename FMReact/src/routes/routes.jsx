import React from 'react';
import { HomePageContainer } from '../containers/HomePageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { FolderPageContainer } from '../containers/FolderPageContainer';

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
  },
  {
    url: '/folder/:name',
    component: <FolderPageContainer />,
    name: 'FolderPageContainer'
  }
];
