import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import assetReducer from './asset';

export default configureStore({
  reducer: {
    auth: authReducer,
    asset: assetReducer,
  },
});
