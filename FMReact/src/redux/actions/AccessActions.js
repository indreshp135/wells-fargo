import { GET_ACCESS } from '../actionTypes/AccessTypes';

export const getAccess = (data) => ({
  type: GET_ACCESS,
  payload: data
});
