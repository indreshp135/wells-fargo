import axios from 'axios';
import {
  GOOGLE_OAUTH_URL,
  LOGIN_URL,
  LOGOUT_URL,
  USER_URL,
  FOLDERS_URL,
  FILES_URL,
  TRANSFER_PERMIT_URL,
  TRANSFER_PROCEED_URL,
  TRANSFER_REQUEST_URL,
  GET_NOTIFICATIONS_URL,
  GET_ACCESS_LIST,
  FILE_ACTION,
  FILES_DELETE_URL,
  FILES_DELETE_PERMISSION,
  FILES_PERMISSION_URL,
  TRANSFER_DIRECT_URL,
  FILES_DELETE_ACTION,
  GET_USER_DETAILS
} from './urls';

// public routes
export const googleAuth = (data) => axios.post(GOOGLE_OAUTH_URL, data);
export const userLogin = (data) => axios.post(LOGIN_URL, data);

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

// folders
export const getFolders = () => axios.get(FOLDERS_URL, getHeader());
export const createFolder = (data) => axios.post(FOLDERS_URL, data, getHeader());

// files
export const getFiles = (folder) => axios.get(`${FOLDERS_URL}${folder}`, getHeader());
export const createFile = (data) => axios.post(FILES_URL, data, {
  headers: {
    Authorization: `Token ${sessionStorage.getItem('Token')}`,
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteFile = (id) => axios.delete(`${FILES_DELETE_URL}${id}/`, getHeader());
export const fileActionPermit = (data) => axios.post(FILE_ACTION, data, getHeader());
export const fileDeleteActionPermit = (data) => axios.post(FILES_DELETE_ACTION, data, getHeader());
export const deletePermissionFile = (id) => axios.delete(`${FILES_DELETE_PERMISSION}${id}/`, getHeader());
export const createPermissionFile = (data) => axios.post(FILES_PERMISSION_URL, data, {
  headers: {
    Authorization: `Token ${sessionStorage.getItem('Token')}`,
    'Content-Type': 'multipart/form-data'
  }
});

// transfers
export const transferRequest = (data) => axios.post(TRANSFER_REQUEST_URL, data, getHeader());
export const transferProceed = (data) => axios.post(TRANSFER_PROCEED_URL, data, getHeader());
export const transferPermit = (data) => axios.post(TRANSFER_PERMIT_URL, data, getHeader());
export const transferDirect = (data) => axios.post(TRANSFER_DIRECT_URL, data, getHeader());

// notifications
export const getNotifications = () => axios.get(GET_NOTIFICATIONS_URL, getHeader());

// Access list

export const getAccessList = () => axios.get(GET_ACCESS_LIST, getHeader());

// User details

export const getUserDisplayDetails = () => axios.get(GET_USER_DETAILS, getHeader());
