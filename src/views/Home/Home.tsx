import { HiCurrencyDollar } from 'react-icons/hi';
import { RiStockLine } from 'react-icons/ri';
import { BsFillCollectionFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './Home.scss';

function Home() {
  return (
    <div id="home">
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
  );
}

export default Home;
