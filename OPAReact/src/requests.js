import axios from 'axios';
import { GOOGLE_OAUTH_URL, LOGOUT_URL, USER_URL } from './urls';

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
