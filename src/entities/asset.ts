export type Asset = {
  id: number;
  code: string;
  name: string;
  user_id: number;
};

export type AssetEntry = {
  id: number;
  date: string;
  asset_id: number;
  currency_id: number;
  is_purchase: boolean;
  quantity: number;
  user_id: number;
};

export type AssetEntryRequestPayload = {
  [assetId: Asset['id']]: AssetEntry[];
};
