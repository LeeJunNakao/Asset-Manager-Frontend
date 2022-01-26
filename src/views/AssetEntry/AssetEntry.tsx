import { useSelector } from 'react-redux';
import { InputConfig } from 'components/form/FormBuilder/protocols';
import generatePage from 'utils/page/generate-entity-page';
import {
  createAssetEntry,
  editAssetEntry,
  deleteAssetEntry,
} from 'http-services/asset/asset-entry';
import {
  setAssetEntries,
  addAssetEntry,
  updateAssetEntry,
  removeAssetEntry,
} from 'store/asset';
import { selectAssetEntries } from 'store/asset';
import { selectCurrencies } from 'store/currency';
import { Currency } from 'entities/currency';

function AssetEntry() {
  const formData = {
    title: 'Asset Entry',
    properties: [
      {
        title: 'date',
        label: 'Date',
        type: 'text',
        inputStyle: 'input' as InputConfig['inputStyle'],
        validation: {
          required: true,
        },
      },
      {
        title: 'currency_id',
        label: 'Assets',
        type: 'text',
        inputStyle: 'select' as InputConfig['inputStyle'],
        options: useSelector(selectCurrencies).map((asset: Currency) => ({
          label: asset.code,
          value: asset.id,
        })),
      },
    ],
  };
  return generatePage({
    title: 'Portfolio',
    formData: formData,
    table: {
      exclude: ['id', 'user_id', 'assets_ids'],
    },
    service: {
      createItem: createAssetEntry,
      editItem: editAssetEntry,
      deleteItem: deleteAssetEntry,
    },
    store: {
      selectItems: selectAssetEntries,
      addItem: addAssetEntry,
      updateItem: updateAssetEntry,
      removeItem: removeAssetEntry,
    },
  })();
}

export default AssetEntry;
