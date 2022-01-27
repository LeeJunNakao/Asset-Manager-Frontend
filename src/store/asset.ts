import { createSlice } from '@reduxjs/toolkit';
import { Asset, AssetEntry, AssetEntryRequestPayload } from 'entities/asset';

interface State {
  assets: Asset[];
  assetEntries: AssetEntryRequestPayload;
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState: {
    assets: [],
    assetEntries: {},
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
    setAssetEntries: (state, action) => {
      state.assetEntries = action.payload;
    },
    addAssetEntry: (state, action) => {
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      if (assetEntries) assetEntries.push(action.payload);
      else state.assetEntries[assetId] = [action.payload];
    },
    updateAssetEntry: (state, action) => {
      const id = action.payload.id;
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      const index = assetEntries.findIndex((i) => i.id === id);

      assetEntries.splice(index, 1, action.payload);
    },
    removeAssetEntry: (state, action) => {
      const id = action.payload.id;
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      const index = assetEntries.findIndex((i) => i.id === id);

      assetEntries.splice(index, 1);
    },
  },
});

export const selectAssets = (state: any) => state.asset.assets;
export const selectAsset = (state: any) => (id: number) =>
  state.asset.assets.find((i: Asset) => i.id === id);
export const selectEntries = (state: any) => state.asset.assetEntries;

export const {
  setAssets,
  updateAsset,
  addAsset,
  removeAsset,
  setAssetEntries,
  addAssetEntry,
  updateAssetEntry,
  removeAssetEntry,
} = assetSlice.actions;
export default assetSlice.reducer;
