import { CALLBACK_URL, CLIENT_ID, BACKEND_URL } from './config';

export const GOOGLE_OAUTH_URL = `${BACKEND_URL}/api/auth/google/`;
export const LOGOUT_URL = `${BACKEND_URL}/accounts/logout/`;
export const LOGIN_URL = `${BACKEND_URL}/accounts/login/`;
export const USER_URL = `${BACKEND_URL}/accounts/user/`;

// Media
export const MEDIA_URL = `${BACKEND_URL}/uploads/`;

// Folders
export const FOLDERS_URL = `${BACKEND_URL}/api/folder/`;

// Files
export const FILES_URL = `${BACKEND_URL}/api/file/`;
export const FILES_DELETE_URL = `${BACKEND_URL}/api/file/delete/`;
export const FILE_ACTION = `${FILES_URL}action/`;
export const FILES_DELETE_ACTION = `${FILE_ACTION}delete/`;
export const FILES_PERMISSION_URL = `${BACKEND_URL}/api/file/permission/`;
export const FILES_DELETE_PERMISSION = `${FILES_PERMISSION_URL}delete/`;

// transfer
export const TRANSFER_REQUEST_URL = `${BACKEND_URL}/api/transfer/file/request/`;
export const TRANSFER_PROCEED_URL = `${BACKEND_URL}/api/transfer/file/proceed/`;
export const TRANSFER_PERMIT_URL = `${BACKEND_URL}/api/transfer/file/permit/`;
export const TRANSFER_DIRECT_URL = `${BACKEND_URL}/api/transfer/file/direct/`;

// notifications
export const GET_NOTIFICATIONS_URL = `${BACKEND_URL}/api/notifications/`;

// User
export const GET_USER_DETAILS = `${BACKEND_URL}/api/userDet/`;
// Access list
export const GET_ACCESS_LIST = `${BACKEND_URL}/api/authorizations/`;
export const GAUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${CALLBACK_URL}&prompt=consent&response_type=token&client_id=${CLIENT_ID}&scope=openid%20email%20profile`;
