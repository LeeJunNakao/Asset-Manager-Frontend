import { Currency } from 'entities/currency';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { InputConfig, Payload } from 'components/form/FormBuilder/protocols';
import generatePage from 'utils/page/generate-entity-page';
import {
  createAssetEntry,
  editAssetEntry,
  deleteAssetEntry,
} from 'http-services/asset/asset-entry';
import { addAssetEntry, updateAssetEntry, removeAssetEntry } from 'store/asset';
import { selectAsset } from 'store/asset';
import { selectCurrencies } from 'store/currency';
import { useNavigate } from 'react-router-dom';
import { IoCaretBackSharp } from 'react-icons/io5';
import { AssetEntry as Entry } from 'entities/asset';
import { maskCurrency } from 'utils/masks';
import { TableData } from 'components/table/protocols';
import './style.scss';

function AssetEntry() {
  const { assetId } = useParams();
  const asset = useSelector(selectAsset)(Number(assetId));
  const currencies = useSelector(selectCurrencies);

  const navigate = useNavigate();

  const selectAssetEntries = (assetId: string) => (state: any) =>
    (state.asset.assetEntries[assetId] || []).map((entry: Entry) => {
      const currency = currencies.find(
        (c: Currency) => c.id === entry.currency_id
      );

      const data = {
        ...entry,
        type: entry.is_purchase ? 'purchase' : 'sell',
        value: currency ? Number(entry.value) / 10 ** currency.decimal : 0,
      };

      return data;
    });

  const formData = {
    title: 'Asset Entry',
    properties: [
      {
        title: 'date',
        label: 'Date',
        type: 'text',
        inputStyle: 'datepicker' as InputConfig['inputStyle'],
        validation: {
          required: true,
        },
      },
      {
        title: 'currency_id',
        label: 'Currency',
        type: 'text',
        inputStyle: 'select' as InputConfig['inputStyle'],
        options: currencies.map((asset: Currency) => ({
          label: asset.code,
          value: asset.id,
        })),
      },
      {
        title: 'is_purchase',
        label: 'Type',
        type: 'text',
        inputStyle: 'select' as InputConfig['inputStyle'],
        options: [
          {
            label: 'Purchase',
            value: true,
          },
          {
            label: 'Sell',
            value: false,
          },
        ],
      },
      {
        title: 'quantity',
        label: 'Quantity',
        type: 'number',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
        },
      },
      {
        title: 'value',
        label: 'Value $',
        type: 'number',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
        },
      },
    ],
  };

  const menu = [
    {
      icon: IoCaretBackSharp,
      text: 'back',
      onClick: () => navigate('/asset'),
    },
  ];

  const createItem = async (payload: Omit<Entry, 'asset_id' | 'id'>) => {
    const currency = currencies.find(
      (c: Currency) => c.id === payload.currency_id
    );
    const data = {
      ...payload,
      date: payload.date.split('T')[0],
      asset_id: Number(assetId),
      value: payload.value * 10 ** currency.decimal,
    };

    const response = await createAssetEntry(data);

    return response;
  };

  const editItem = async (payload: Entry) => {
    const currency = currencies.find(
      (c: Currency) => c.id === payload.currency_id
    );
    const data = {
      ...payload,
      date: payload.date.split('T')[0],
      asset_id: Number(assetId),
      value: payload.value * 10 ** currency.decimal,
    };

    const response = await editAssetEntry(data);

    return response;
  };

  const Page = generatePage({
    title: 'Asset Entry',
    formData: formData,
    table: {
      exclude: [
        'id',
        'user_id',
        'assets_ids',
        'is_purchase',
        'currency_id',
        'asset_id',
      ],
      masks: {
        value: (v: string, item: TableData) => {
          const currency = currencies.find(
            (c: Currency) => c.id === item.currency_id
          ) as Currency;

          return currency
            ? maskCurrency(Number(v), currency.decimal, currency.code)
            : v;
        },
      },
    },
    service: {
      createItem,
      editItem,
      deleteItem: deleteAssetEntry,
    },
    store: {
      selectItems: selectAssetEntries(String(assetId)),
      addItem: addAssetEntry,
      updateItem: updateAssetEntry,
      removeItem: removeAssetEntry,
    },
  });

  return Page({
    upperChildren: (
      <div className="asset-info">
        <span>
          {asset?.name} ({asset?.code})
        </span>
      </div>
    ),
    menu,
  });
}

export default AssetEntry;
