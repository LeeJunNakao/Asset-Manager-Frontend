import { selectAssets, updateAsset, addAsset, removeAsset } from 'store/asset';
import { editAsset, createAsset, deleteAsset } from 'http-services/asset';
import generatePage from 'utils/page/generate-entity-page';
import { InputConfig } from 'components/form/FormBuilder/protocols';

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

const Asset = generatePage({
  title: 'Asset',
  formData: formData,
  service: {
    createItem: createAsset,
    editItem: editAsset,
    deleteItem: deleteAsset,
  },
  store: {
    selectItems: selectAssets,
    addItem: addAsset,
    updateItem: updateAsset,
    removeItem: removeAsset,
  },
});

export default Asset;
