import { InputConfig } from 'components/form/FormBuilder/protocols';
import generatePage from 'utils/page/generate-entity-page';
import {
  createCurrency,
  editCurrency,
  deleteCurrency,
} from 'http-services/currency';
import {
  selectCurrencies,
  addCurrency,
  updateCurrency,
  removeCurrency,
} from 'store/currency';

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
    {
      title: 'decimal',
      label: 'Decimal places',
      type: 'number',
      inputStyle: 'input' as InputConfig['inputStyle'],
      validation: {
        required: true,
      },
    },
  ],
};

const Currency = generatePage({
  title: 'Currency',
  selectItems: selectCurrencies,
  formData: formData,
  service: {
    createItem: createCurrency,
    editItem: editCurrency,
    deleteItem: deleteCurrency,
  },
  store: {
    addItem: addCurrency,
    updateItem: updateCurrency,
    removeItem: removeCurrency,
  },
});

export default Currency;
