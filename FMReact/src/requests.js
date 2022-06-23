import axios from 'axios';
import {
  GOOGLE_OAUTH_URL,
  LOGOUT_URL,
  USER_URL,
  FOLDERS_URL,
  FILES_URL,
  TRANSFER_PERMIT_URL,
  TRANSFER_PROCEED_URL,
  TRANSFER_REQUEST_URL,
  GET_NOTIFICATIONS_URL

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

// folders
export const getFolders = () => axios.get(FOLDERS_URL, header);
export const createFolder = (data) => axios.post(FOLDERS_URL, data, header);

// files
export const getFiles = (folder) => axios.get(`${FOLDERS_URL}${folder}`, header);
export const createFile = (data) => axios.post(FILES_URL, data, {
  headers: {
    Authorization: `Token ${sessionStorage.getItem('Token')}`,
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteFile = (id) => axios.delete(`${FILES_URL}${id}/`, header);

// transfers
export const transferRequest = (data) => axios.post(TRANSFER_REQUEST_URL, data, header);
export const transferProceed = (data) => axios.post(TRANSFER_PROCEED_URL, data, header);
export const transferPermit = (data) => axios.post(TRANSFER_PERMIT_URL, data, header);

// notifications
export const getNotifications = () => axios.get(GET_NOTIFICATIONS_URL, header);
