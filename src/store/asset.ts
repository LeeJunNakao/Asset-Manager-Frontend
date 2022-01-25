import { createSlice } from '@reduxjs/toolkit';
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
    updateAsset: (state, action) => {
      const id = action.payload.id;
      const index = state.assets.findIndex((i) => i.id === id);
      const assets = [...state.assets];

      assets.splice(index, 1, action.payload);

      state.assets = assets;
    },
    addAsset: (state, action) => {
      state.assets = [...state.assets, action.payload];
    },
    removeAsset: (state, action) => {
      const id = action.payload.id;
      const index = state.assets.findIndex((i) => i.id === id);
      const assets = [...state.assets];

      assets.splice(index, 1);

      state.assets = assets;
    },
  },
});

export const selectAssets = (state: any) => state.asset.assets;

export const { setAssets, updateAsset, addAsset, removeAsset } =
  assetSlice.actions;
export default assetSlice.reducer;
