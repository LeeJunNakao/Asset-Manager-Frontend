import { useNavigate } from 'react-router-dom';
import {
  selectAssets,
  updateAsset,
  addAsset,
  removeAsset,
  getAssetQuantity,
} from 'store/asset';
import { getSelectedCurrency } from 'store/currency';
import { editAsset, createAsset, deleteAsset } from 'http-services/asset';
import generatePage from 'utils/page/generate-entity-page';
import { InputConfig, Payload } from 'components/form/FormBuilder/protocols';
import { Currency } from 'entities/currency';
import './styles.scss';

const formData = {
  title: 'Asset',
  properties: [
    {
      title: 'name',
      label: 'Name',
      type: 'text',
      inputStyle: 'input' as InputConfig['inputStyle'],
      validation: {
        required: true,
      },
    },
    {
      title: 'code',
      label: 'Code',
      type: 'text',
      inputStyle: 'input' as InputConfig['inputStyle'],
      validation: {
        required: true,
      },
    },
  ],
};
function Asset() {
  const navigate = useNavigate();

  const openAsset = (data: Payload) => {
    const { id } = data;
    navigate(`/asset/${id}`);
  };

  const selectTableData = (state: any) => {
    const assets = selectAssets(state);
    const quantity = getAssetQuantity(state);
    const currency = getSelectedCurrency(state) as Currency;
    return assets.map((a) => ({ ...a, total: quantity(a.id, currency.id) }));
  };

  const Page = generatePage({
    title: 'Asset',
    formData: formData,
    table: {
      onClick: openAsset,
    },
    service: {
      createItem: createAsset,
      editItem: editAsset,
      deleteItem: deleteAsset,
    },
    store: {
      selectItems: selectTableData,
      addItem: addAsset,
      updateItem: updateAsset,
      removeItem: removeAsset,
    },
  });

  return <div className="asset-page">{Page()}</div>;
}

export default Asset;
