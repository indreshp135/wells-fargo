import { CALLBACK_URL, CLIENT_ID } from './config';

const BACKEND_URL = 'http://localhost:8000';

export const GOOGLE_OAUTH_URL = `${BACKEND_URL}/api/auth/google/`;
export const LOGOUT_URL = `${BACKEND_URL}/accounts/logout/`;
export const USER_URL = `${BACKEND_URL}/accounts/user/`;

// Assets
export const ASSETS_GET_URL = `${BACKEND_URL}/api/asset/`;
export const ASSETS_POST_URL = `${BACKEND_URL}/api/asset/`;

// Actions
export const ACTION_GET_URL = `${BACKEND_URL}/api/action/`;
export const ACTION_POST_URL = `${BACKEND_URL}/api/action/`;

// SODs
export const SOD_GET_URL = `${BACKEND_URL}/api/SOD/`;
export const SOD_POST_URL = `${BACKEND_URL}/api/SOD/`;
export const SOD_DELETE_URL = `${BACKEND_URL}/api/SOD/`;

// SOD Rules
export const SODRULES_GET_URL = `${BACKEND_URL}/api/SODRules/`;
export const SODRULES_POST_URL = `${BACKEND_URL}/api/SODRules/create`;
export const SODRULES_DELETE_URL = `${BACKEND_URL}/api/SODRules/`;
export const EACH_SODRULES_GET_URL = `${BACKEND_URL}/api/SODRules/sod/`;
// Applications
export const APPLICATION_GET_URL = `${BACKEND_URL}/api/application/`;
export const APPLICATION_POST_URL = `${BACKEND_URL}/api/application/`;

export const GAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${CALLBACK_URL}&prompt=consent&response_type=token&client_id=${CLIENT_ID}&scope=openid%20email%20profile`;
