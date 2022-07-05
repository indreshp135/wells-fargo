import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import rootReducer from './rootReducer';
import { secretKey } from '../config';

const encryptor = encryptTransform({
  secretKey
});
const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor]

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
