import { InputConfig } from 'components/form/FormBuilder/protocols';
import generatePage from 'utils/page/generate-entity-page';
import {
  createPortfolio,
  editPortfolio,
  deletePortfolio,
} from 'http-services/portfolio';
import {
  selectPortfolios,
  addPortfolio,
  updatePortfolio,
  removePortfolio,
} from 'store/portfolio';

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
      title: 'assets_ids',
      label: 'Assets',
      type: 'text',
      inputStyle: 'select' as InputConfig['inputStyle'],
      options: ['james', 'wilton'],
    },
  ],
};

const Portfolio = generatePage({
  title: 'Portfolio',
  formData: formData,
  service: {
    createItem: createPortfolio,
    editItem: editPortfolio,
    deleteItem: deletePortfolio,
  },
  store: {
    selectItems: selectPortfolios,
    addItem: addPortfolio,
    updateItem: updatePortfolio,
    removeItem: removePortfolio,
  },
});

export default Portfolio;
