import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoCaretBackSharp } from 'react-icons/io5';
import { selectPortfolio } from 'store/portfolio';
import { selectAssetsByIds, selectAssetAvgPrice } from 'store/asset';
import PageContent from 'components/page-content/PageContent';
import Table from 'components/table/Table';
import { TableData } from 'components/table/protocols';
import currency, { getSelectedCurrency } from 'store/currency';
import { useEffect } from 'react';
import { maskCurrency } from 'utils/masks';
import './styles.scss';
import { fromRawToFormated } from 'utils/parser/currency';

function PortfolioDetails() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  const portfolio = useSelector(selectPortfolio(Number(portfolioId)));
  const assetsData = useSelector(
    selectAssetsByIds(portfolio?.assets_ids || [])
  );
  const avgPrice = useSelector(selectAssetAvgPrice);
  const selectedCurrency = useSelector(getSelectedCurrency);
  const parsedAssets = assetsData.map((i) => {
    if (selectedCurrency) {
      const averagePrice = avgPrice[i.id][selectedCurrency.id] || 0;
      const formatedPrice = fromRawToFormated(
        averagePrice,
        selectedCurrency.decimal
      );
      return {
        ...i,
        'avg price': maskCurrency(
          formatedPrice,
          selectedCurrency.decimal,
          selectedCurrency.code
        ),
      };
    }

    return { ...i, 'avg price': 0 };
  });

  const menu = [
    {
      icon: IoCaretBackSharp,
      text: 'back',
      onClick: () => navigate('/portfolio'),
    },
  ];

  const onClick = (data: TableData) => {
    navigate(`/asset/${data.id}`);
  };

  return (
    <div id="portfolio-details-page" className="page-wrapper">
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
