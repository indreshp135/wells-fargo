import axios from 'axios';
import {
  ASSETS_GET_URL,
  GOOGLE_OAUTH_URL,
  LOGOUT_URL,
  USER_URL,
  ASSETS_POST_URL,
  ACTION_GET_URL,
  ACTION_POST_URL,
  SOD_GET_URL,
  SOD_POST_URL,
  SOD_DELETE_URL,
  SODRULES_GET_URL,
  SODRULES_POST_URL,
  SODRULES_DELETE_URL,
  EACH_SODRULES_GET_URL,
  APPLICATION_GET_URL,
  APPLICATION_POST_URL
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

// SODs
export const getSOD = (hash) => axios.get(`${SOD_GET_URL}${hash}`, header);
export const postSOD = (data) => axios.post(SOD_POST_URL, data, header);
export const deleteSOD = (id) => axios.delete(`${SOD_DELETE_URL + id}/delete`, header);

// SOD Rules
export const getSODRules = (query) => axios.get(`${SODRULES_GET_URL}?${query}`, header);
export const postSODRules = (data) => axios.post(SODRULES_POST_URL, data, header);
export const deleteSODRules = (id) => axios.delete(`${SODRULES_DELETE_URL + id}/delete`, header);
export const geteachSODRules = (query) => axios.get(`${EACH_SODRULES_GET_URL}?${query}`, header);
// Applications
export const getApplications = () => axios.get(APPLICATION_GET_URL, header);
export const postApplication = (data) => axios.post(APPLICATION_POST_URL, data, header);
