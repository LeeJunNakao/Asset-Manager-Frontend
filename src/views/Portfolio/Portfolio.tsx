import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputConfig, Payload } from 'components/form/FormBuilder/protocols';
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
import { selectAssets } from 'store/asset';
import { Asset } from 'entities/asset';

function Portfolio() {
  const navigate = useNavigate();

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
        inputStyle: 'multiselect' as InputConfig['inputStyle'],
        options: useSelector(selectAssets).map((asset: Asset) => ({
          label: asset.code,
          value: asset.id,
        })),
      },
    ],
  };

  const openPortfolio = (data: Payload) => {
    const { id } = data;
    navigate(`/portfolio/${id}`);
  };

  return generatePage({
    title: 'Portfolio',
    formData: formData,
    table: {
      exclude: ['id', 'user_id', 'assets_ids'],
      onClick: openPortfolio,
    },
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
  })();
}

export default Portfolio;
