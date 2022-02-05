import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoCaretBackSharp } from 'react-icons/io5';
import { selectPortfolio } from 'store/portfolio';
import { selectAssetsByIds, selectAssetAvgPrice } from 'store/asset';
import PageContent from 'components/page-content/PageContent';
import Table from 'components/table/Table';
import { TableData } from 'components/table/protocols';
import './styles.scss';
import { useEffect } from 'react';
import { maskCurrency } from 'utils/masks';

function PortfolioDetails() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  const portfolio = useSelector(selectPortfolio(Number(portfolioId)));
  const assetsData = useSelector(
    selectAssetsByIds(portfolio?.assets_ids || [])
  );
  const avgPrice = useSelector(selectAssetAvgPrice);
  const parsedAssets = assetsData.map((i) => ({
    ...i,
    'avg price': avgPrice[i.id],
  }));

  const menu = [
    {
      icon: IoCaretBackSharp,
      text: 'back',
      onClick: () => navigate('/portfolio'),
    },
  ];

  const onClick = (data: TableData) => {
    console.log('!!!!!!!!!!!!!!!!!!!!', data);
    navigate(`/asset/${data.id}`);
  };

  return (
    <div className="page-wrapper">
      <PageContent text="Porfolio" menu={menu}>
        <div className="info-tag">
          <span>{portfolio?.name}</span>
        </div>
        <Table
          data={parsedAssets}
          exclude={['id', 'user_id']}
          onClick={onClick}
        ></Table>
      </PageContent>
    </div>
  );
}

export default PortfolioDetails;
