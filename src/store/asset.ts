import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Asset } from 'entities/asset';

interface State {
  assets: Asset[];
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState: {
    assets: [],
  } as State,
  reducers: {
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
  },
});

export const selectAssets = (state: any) => state.asset.assets;

export const { setAssets } = assetSlice.actions;
export default assetSlice.reducer;
