import React from 'react';
import { HomePageContainer } from '../containers/HomePageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { FolderPageContainer } from '../containers/FolderPageContainer';
import { NotificationsPageContainer } from '../containers/NotificationsPageContainer';

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
  },
  {
    url: '/notifications',
    component: <NotificationsPageContainer />,
    name: 'NotificationsPageContainer'
  }
];
