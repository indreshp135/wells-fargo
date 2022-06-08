import { CALLBACK_URL, CLIENT_ID } from './config';

const BACKEND_URL = 'http://localhost:8000';

export const GOOGLE_OAUTH_URL = `${BACKEND_URL}/api/auth/google/`;
export const LOGOUT_URL = `${BACKEND_URL}/auth/logout/`;
export const USER_URL = `${BACKEND_URL}/auth/user/`;

export const GAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${CALLBACK_URL}&prompt=consent&response_type=token&client_id=${CLIENT_ID}&scope=openid%20email%20profile`;
