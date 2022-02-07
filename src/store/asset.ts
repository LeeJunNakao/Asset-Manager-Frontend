import { createSlice } from '@reduxjs/toolkit';
import { Asset, AssetEntry, AssetEntryRequestPayload } from 'entities/asset';
import deepcopy from 'deepcopy';
import { toISODate, sortByDate } from 'utils/parser/date';
import AvgPriceCalculator, { Item } from 'utils/parser/avg-price-calculator';
import { groupBy } from 'utils/parser/array';
import { Currency } from 'entities/currency';

type State = {
  assets: Asset[];
  assetEntries: AssetEntryRequestPayload;
  assetsCurrentPrice: {
    [assetId: Asset['code']]: number;
  };
};
type GroupedEntries = {
  [currencyId: string | number]: AssetEntry[];
};
type GroupedData<T> = {
  [assetId: string]: T;
};

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
    assetsCurrentPrice: {},
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
    addAssetCurrentPrice: (state, action) => {
      state.assetsCurrentPrice[action.payload.code] = action.payload.price;
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
export const selectEntries = (state: any): AssetEntryRequestPayload =>
  (state.asset as State).assetEntries;
export const getGroupedEntries = (state: any): GroupedData<GroupedEntries> => {
  const entries = selectEntries(state);

  const groupedEntries = Object.entries(entries).map(([assetId, entries]) => [
    assetId,
    groupBy(entries, 'currency_id'),
  ]);

  return Object.fromEntries(groupedEntries);
};
export const getAssetAvgPrice =
  (state: any) =>
  (assetId: Asset['id'], currencyId: Currency['id']): number => {
    const entries = getGroupedEntries(state)[assetId][currencyId] || [];
    const parsedEntries = entries.map((e) => ({
      ...e,
      date: new Date(e.date),
      isPurchase: e.is_purchase,
    })) as Item[];
    return new AvgPriceCalculator(parsedEntries).calculate();
  };
export const getAssetQuantity =
  (state: any) =>
  (assetId: Asset['id'], currencyId: Currency['id']): number => {
    const entries = getGroupedEntries(state)[assetId][currencyId] || [];
    const sumResult = entries.reduce((acc, curr) => {
      const parseQuantity = curr.is_purchase ? curr.quantity : -curr.quantity;
      return acc + parseQuantity;
    }, 0);

    return sumResult;
  };
export const getAssetCurrentPrice =
  (state: any) => (assetCode: Asset['code']) => {
    return (state.asset as State).assetsCurrentPrice[assetCode];
  };

export const {
  setAssets,
  updateAsset,
  addAsset,
  removeAsset,
  addAssetCurrentPrice,
  setAssetEntries,
  addAssetEntry,
  updateAssetEntry,
  removeAssetEntry,
} = assetSlice.actions;
export default assetSlice.reducer;
