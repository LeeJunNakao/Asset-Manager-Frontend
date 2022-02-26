import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoCaretBackSharp } from 'react-icons/io5';
import { selectPortfolio } from 'store/portfolio';
import {
  selectAssetsByIds,
  getAssetAvgPrice,
  getAssetQuantity,
  getAssetCurrentPrice,
} from 'store/asset';
import PageContent from 'components/page-content/PageContent';
import Table from 'components/table/Table';
import { TableData } from 'components/table/protocols';
import currency, { getSelectedCurrency } from 'store/currency';
import { useEffect } from 'react';
import { maskCurrency } from 'utils/masks';
import './styles.scss';
import { fromRawToFormated } from 'utils/parser/currency';
import PieChart from 'components/charts/Pie';

function PortfolioDetails() {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  const portfolio = useSelector(selectPortfolio(Number(portfolioId)));
  const assetsData = useSelector(
    selectAssetsByIds(portfolio?.assets_ids || [])
  );
  const avgPrice = useSelector(getAssetAvgPrice);
  const totalQuantity = useSelector(getAssetQuantity);
  const selectedCurrency = useSelector(getSelectedCurrency);
  const getPrice = useSelector(getAssetCurrentPrice);
  const parsedAssets = assetsData.map((i) => {
    if (selectedCurrency) {
      const averagePrice = avgPrice(i.id, selectedCurrency.id);
      const quantity = totalQuantity(i.id, selectedCurrency.id);

      const formatedPrice = fromRawToFormated(
        averagePrice,
        selectedCurrency.decimal
      );
      return {
        ...i,
        total: quantity,
        rawAvgPrice: averagePrice,
        'average price': maskCurrency(
          formatedPrice,
          selectedCurrency.decimal,
          selectedCurrency.code
        ),
        'current price': maskCurrency(
          getPrice(i.code) || 0,
          selectedCurrency.decimal,
          selectedCurrency.code
        ),
      };
    }

    return { ...i, 'average price': 0, rawAvgPrice: 0, total: 0 };
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

  const chartData = parsedAssets
    .map((a) => ({
      id: a.code,
      label: a.code,
      value: a.total * getPrice(a.code),
    }))
    .filter((item) => item.value);

  const chartPurchaseData = parsedAssets
    .map((a) => ({
      id: a.code,
      label: a.code,
      value: a.total * (Number(a.rawAvgPrice) || 0),
    }))
    .filter((item) => item.value);

  return (
    <div id="portfolio-details-page" className="page-wrapper">
      <PageContent text="Porfolio" menu={menu}>
        <div className="info-tag">
          <span>{portfolio?.name}</span>
        </div>
        <Table
          data={parsedAssets}
          exclude={['id', 'user_id', 'rawAvgPrice']}
          onClick={onClick}
          hideIcons
        ></Table>
        <div className="charts">
          {chartPurchaseData.length !== 0 && (
            <div className="chart-wrapper">
              <PieChart data={chartPurchaseData} title="Purchase allocation" />
            </div>
          )}
          {chartData.length !== 0 && (
            <div className="chart-wrapper">
              <PieChart data={chartData} title="Current allocation" />
            </div>
          )}
        </div>
      </PageContent>
    </div>
  );
}

export default PortfolioDetails;
