import { createSlice } from '@reduxjs/toolkit';
import { Asset, AssetEntry, AssetEntryRequestPayload } from 'entities/asset';
import deepcopy from 'deepcopy';
import { toISODate, sortByDate } from 'utils/parser/date';
import AvgPriceCalculator, { Item } from 'utils/parser/avg-price-calculator';

interface State {
  assets: Asset[];
  assetEntries: AssetEntryRequestPayload;
}

const sortAssetEntries = (entries: AssetEntryRequestPayload) => {
  const sortedEntries = Object.entries(entries)
    .map(([assetId, assetEntries]) => [
      assetId,
      assetEntries.map((entry) => ({
        ...entry,
        date: new Date(entry.date),
      })),
    ])
    .map(([assetId, assetEntries]) => [
      assetId,
      (assetEntries as any[]).sort(sortByDate),
    ])
    .map(([assetId, assetEntries]) => [
      assetId,
      (assetEntries as any[]).map((entry) => ({
        ...entry,
        date: toISODate(entry.date),
      })),
    ]);

  return Object.fromEntries(sortedEntries);
};

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
      const entries: AssetEntryRequestPayload = deepcopy(action.payload);

      state.assetEntries = sortAssetEntries(entries);
    },
    addAssetEntry: (state, action) => {
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      if (assetEntries) {
        assetEntries.push(action.payload);
        state.assetEntries = sortAssetEntries(state.assetEntries);
      } else state.assetEntries[assetId] = [action.payload];
    },
    updateAssetEntry: (state, action) => {
      const id = action.payload.id;
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      const index = assetEntries.findIndex((i) => i.id === id);

      assetEntries.splice(index, 1, action.payload);
      state.assetEntries = sortAssetEntries(state.assetEntries);
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
export const selectAssetsByIds = (assetsIds: Asset['id'][]) => (state: any) =>
  (state.asset as State).assets.filter((a: Asset) => assetsIds.includes(a.id));
export const selectAsset = (state: any) => (id: number) =>
  state.asset.assets.find((i: Asset) => i.id === id);
export const selectEntries = (state: any) =>
  (state.asset as State).assetEntries;
export const selectAssetAvgPrice = (state: any) => {
  const entries = Object.entries(selectEntries(state))
    .map(([assetId, entries]): [string, Item[]] => [
      assetId,
      entries.map((i) => ({
        ...i,
        isPurchase: i.is_purchase,
        date: new Date(i.date),
      })),
    ])
    .map(([assetId, entries]) => [
      assetId,
      new AvgPriceCalculator(entries).calculate(),
    ]);

  return Object.fromEntries(entries);
};

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
