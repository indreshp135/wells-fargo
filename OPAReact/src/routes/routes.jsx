import React from 'react';
import { HomePageContainer } from '../containers/HomePageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { AssetActionPageContainer } from '../containers/AssetActionPageContainer';
import { SODPageContainer } from '../containers/SODPageContainer';
import { SODUpdatePageContainer } from '../containers/SODUpdatePageContainer';

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
  },
  {
    url: '/sod',
    component: <SODPageContainer />,
    name: 'SODPageContainer'
  },
  {
    url: '/sod/update/:id',
    component: <SODUpdatePageContainer />,
    name: 'SODUpdateContainer'
  }
];
