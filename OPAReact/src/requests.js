import axios from 'axios';
import {
  ASSETS_GET_URL,
  GOOGLE_OAUTH_URL,
  LOGOUT_URL,
  USER_URL,
  ASSETS_POST_URL,
  ACTION_GET_URL,
  ACTION_POST_URL
} from './urls';

// public routes
export const googleAuth = (data) => axios.post(GOOGLE_OAUTH_URL, data);

// private routes

// header for Auth
const header = {
  headers: {
    Authorization: `Token ${sessionStorage.getItem('Token')}`
  }
};

export const getUserDetails = () => axios.get(USER_URL, header);
export const userLogout = () => axios.post(LOGOUT_URL, header);

// Assets
export const getAssets = () => axios.get(ASSETS_GET_URL, header);
export const postAsset = (data) => axios.post(ASSETS_POST_URL, data, header);

// Actions
export const getActions = () => axios.get(ACTION_GET_URL, header);
export const postAction = (data) => axios.post(ACTION_POST_URL, data, header);
