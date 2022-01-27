import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Auth from 'views/Auth/Auth';
import './App.scss';
import { RequireAuth } from 'components/auth/RequireAuth';
import Home from 'views/Home/Home';
import Asset from 'views/Asset/Asset';
import Currency from 'views/Currency/Currency';
import Portfolio from 'views/Portfolio/Portfolio';
import AssetEntry from 'views/AssetEntry/AssetEntry';
import { getAsset } from 'http-services/asset';
import { getCurrency } from 'http-services/currency';
import { getPortfolio } from 'http-services/portfolio';
import { getAssetEntry } from 'http-services/asset/asset-entry';
import { setAssetEntries, setAssets } from 'store/asset';
import { setCurrencies } from 'store/currency';
import { setPortfolios } from 'store/portfolio';
import PageLoading from 'components/page-loading/PageLoading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const authenticated = useSelector((state: any) => state.auth.authenticated);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await getAsset();
      dispatch(setAssets(response));
    };

    const fetchCurrency = async () => {
      const response = await getCurrency();
      dispatch(setCurrencies(response));
    };

    const fetchPortfolio = async () => {
      const response = await getPortfolio();
      dispatch(setPortfolios(response));
    };

    const fetchAssetEntry = async () => {
      const response = await getAssetEntry();
      dispatch(setAssetEntries(response));
    };

    if (authenticated) {
      try {
        setIsLoading(true);
        fetchAssets();
        fetchCurrency();
        fetchPortfolio();
        fetchAssetEntry();
      } finally {
        setIsLoading(false);
      }
    }
  }, [authenticated]);

  return (
    <div className="App">
      {isLoading ? (
        <PageLoading />
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/asset"
            element={
              <RequireAuth>
                <Asset />
              </RequireAuth>
            }
          />
          <Route
            path="asset/:assetId"
            element={
              <RequireAuth>
                <AssetEntry />
              </RequireAuth>
            }
          />
          <Route
            path="/currency"
            element={
              <RequireAuth>
                <Currency />
              </RequireAuth>
            }
          />
          <Route
            path="/portfolio"
            element={
              <RequireAuth>
                <Portfolio />
              </RequireAuth>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
