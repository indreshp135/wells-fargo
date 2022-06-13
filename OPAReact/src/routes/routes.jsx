import React from 'react';
import { HomePageContainer } from '../containers/HomePageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { AssetActionPageContainer } from '../containers/AssetActionPageContainer';

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
    url: '/actions-assets',
    component: <AssetActionPageContainer />,
    name: 'AssetActionPageContainer'
  }
];
