import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import assetReducer from './asset';
import currencyReducer from './currency';
import portfolioReducer from './portfolio';

export default configureStore({
  reducer: {
    auth: authReducer,
    asset: assetReducer,
    currency: currencyReducer,
    portfolio: portfolioReducer,
  },
});
