import { GET_ACCESS } from '../actionTypes/AccessTypes';

const initialState = {
  accessList: {}
};

const accessReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case GET_ACCESS: return {
      accessList: payload
    };
    default: return state;
  }
};

export default accessReducer;
