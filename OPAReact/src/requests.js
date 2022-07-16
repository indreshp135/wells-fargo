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
  APPLICATION_POST_URL,
  EXCEPTIONS_GET_URL,
  EXCEPTIONS_POST_URL,
  EXCEPTIONS_DELETE_URL,
  EXCEPTIONS_RETRIVE_URL,
  USERS_GET_URL,
  USER_EXISTS,
  CREATE_SODUSER_URL,
  GET_SOD_USER

} from './urls';

// public routes
export const googleAuth = (data) => axios.post(GOOGLE_OAUTH_URL, data);

// private routes

// header for Auth
const getHeader = () => {
  const header = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem('Token')}`
    }
  };
  return header;
};

export const getUserDetails = () => axios.get(USER_URL, getHeader());
export const userLogout = () => axios.post(LOGOUT_URL, getHeader());

// Assets
export const getAssets = (hash) => axios.get(`${ASSETS_GET_URL}${hash}`, getHeader());
export const postAsset = (data) => axios.post(ASSETS_POST_URL, data, getHeader());

// Actions
export const getActions = (hash) => axios.get(`${ACTION_GET_URL}${hash}`, getHeader());
export const postAction = (data) => axios.post(ACTION_POST_URL, data, getHeader());

// SODs
export const getSOD = (hash) => axios.get(`${SOD_GET_URL}${hash}`, getHeader());
export const postSOD = (data) => axios.post(SOD_POST_URL, data, getHeader());
export const deleteSOD = (id) => axios.delete(`${SOD_DELETE_URL + id}/delete`, getHeader());

// SOD Rules
export const getSODRules = (query) => axios.get(`${SODRULES_GET_URL}?${query}`, getHeader());
export const postSODRules = (data) => axios.post(SODRULES_POST_URL, data, getHeader());
export const deleteSODRules = (id) => axios.delete(`${SODRULES_DELETE_URL + id}/delete`, getHeader());
export const geteachSODRules = (query) => axios.get(`${EACH_SODRULES_GET_URL}?${query}`, getHeader());

// Exceptions
export const getExceptions = (hash) => axios.get(`${EXCEPTIONS_GET_URL}${hash}`, getHeader());
export const postExceptions = (data) => axios.post(EXCEPTIONS_POST_URL, data, getHeader());
export const deleteExceptions = (id) => axios.delete(`${EXCEPTIONS_DELETE_URL}${id}/change`, getHeader());
export const getException = (id) => axios.get(`${EXCEPTIONS_RETRIVE_URL}${id}/change`, getHeader());
export const updateException = (id, data) => axios.put(`${EXCEPTIONS_RETRIVE_URL}${id}/change`, data, getHeader());

// Applications
export const getApplications = () => axios.get(APPLICATION_GET_URL, getHeader());
export const postApplication = (data) => axios.post(APPLICATION_POST_URL, data, getHeader());

// Users
export const getUsers = () => axios.get(USERS_GET_URL, getHeader());
export const getUserExist = (query) => axios.get(`${USER_EXISTS}?${query}`, getHeader());

// Sod User
export const postSodUser = (data) => axios.post(CREATE_SODUSER_URL, data, getHeader());
export const getSODUser = (hash) => axios.get(`${GET_SOD_USER}${hash}`, getHeader());
