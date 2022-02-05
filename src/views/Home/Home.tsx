import { useSelector, useDispatch } from 'react-redux';
import { HiCurrencyDollar } from 'react-icons/hi';
import { RiStockLine } from 'react-icons/ri';
import { BsFillCollectionFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
  selectCurrencies,
  setSelectedCurrency,
  getSelectedCurrency,
} from 'store/currency';
import Select from 'components/inputs/Select/Select';
import { Currency } from 'entities/currency';
import './styles.scss';

function Home() {
  const currencies = useSelector(selectCurrencies);
  const selectedCurrency = useSelector(getSelectedCurrency);
  const dispatch = useDispatch();

  const currenciesOptions = currencies.map((currency) => ({
    value: currency,
    label: currency.code,
  }));

  const selectCurrency = (currency: Currency) => {
    dispatch(setSelectedCurrency(currency));
  };

  return (
    <div id="home">
      <div className="home-wrapper">
        <div className="logo">
          <span>Asset Manager</span>
        </div>
        <div className="currency-wrapper">
          <Select
            label="SELECTED CURRENCY"
            options={currenciesOptions}
            data={selectedCurrency}
            setContent={selectCurrency}
          />
        </div>
        <div className="panel">
          <Link className="item" to="asset">
            <RiStockLine />
            <span>Asset</span>
          </Link>
          <Link className="item" to="currency">
            <HiCurrencyDollar />
            <span>Currency</span>
          </Link>
          <Link className="item" to="portfolio">
            <BsFillCollectionFill />
            <span>Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
