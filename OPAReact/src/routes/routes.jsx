import React from 'react';
import { HomePageContainer } from '../containers/HomePageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { AssetActionPageContainer } from '../containers/AssetActionPageContainer';
import { SODPageContainer } from '../containers/SODPageContainer';
import { SODUpdatePageContainer } from '../containers/SODUpdatePageContainer';
import { ApplicationPageContainer } from '../containers/ApplicationPageContainer';
import { ExceptionsPageContainer } from '../containers/ExceptionsPageContainer';
import { AddExceptionsPageContainer } from '../containers/AddExceptionsPageContainer';
import { AddUsersContainer } from '../containers/AddUsersContainer';

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
    url: '/applications/:hash',
    component: <ApplicationPageContainer />,
    name: 'AssetActionPageContainer'
  },
  {
    url: '/applications/:hash/actions-assets',
    component: <AssetActionPageContainer />,
    name: 'AssetActionPageContainer'
  },
  {
    url: '/applications/:hash/sod',
    component: <SODPageContainer />,
    name: 'SODPageContainer'
  },
  {
    url: '/applications/:hash/sod/update/:sodId',
    component: <SODUpdatePageContainer />,
    name: 'SODUpdateContainer'
  },
  {
    url: '/applications/:hash/exception',
    component: <ExceptionsPageContainer />,
    name: 'ExceptionsPageContainer'
  },
  {
    url: '/applications/:hash/exception/add',
    component: <AddExceptionsPageContainer />,
    name: 'AddExceptionPageContainer'
  },
  {
    url: '/applications/:hash/exception/update/:exceptionId',
    component: <AddExceptionsPageContainer />,
    name: 'UpdateExceptionPageContainer'
  },
  {
    url: '/applications/:hash/addUser',
    component: <AddUsersContainer />,
    name: 'UpdateExceptionPageContainer'
  }
];
