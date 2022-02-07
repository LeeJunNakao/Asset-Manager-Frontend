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
import AssetEntry from 'views/Asset/AssetEntry/AssetEntry';
import PorfolioDetails from 'views/Portfolio/details/PortfolioDetails';
import { getAsset } from 'http-services/asset';
import { getCurrency } from 'http-services/currency';
import { getPortfolio } from 'http-services/portfolio';
import { getAssetEntry } from 'http-services/asset/asset-entry';
import { setAssetEntries, setAssets, addAssetCurrentPrice } from 'store/asset';
import { setCurrencies, setSelectedCurrency } from 'store/currency';
import { setPortfolios } from 'store/portfolio';
import { getPrice } from 'http-services/asset/consult-asset-price';
import PageLoading from 'components/page-loading/PageLoading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const authenticated = useSelector((state: any) => state.auth.authenticated);

  const requestData = async () => {
    const fetchAssetsPrice = async (assetCode: string) => {
      try {
        const price = await getPrice(assetCode);
        dispatch(addAssetCurrentPrice({ code: assetCode, price }));
      } catch (error) {
        dispatch(addAssetCurrentPrice({ code: assetCode, price: null }));
      }
    };

    const fetchAssets = async () => {
      const response = await getAsset();
      dispatch(setAssets(response));

      const promises = response.map((asset: any) =>
        fetchAssetsPrice(asset.code)
      );

      await Promise.all(promises);
    };

    const fetchCurrency = async () => {
      const response = await getCurrency();
      const [defaultCurrency] = response.sort((a, b) => a.id - b.id);
      dispatch(setSelectedCurrency(defaultCurrency));
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
    try {
      setIsLoading(true);
      await fetchAssets();
      await fetchCurrency();
      await fetchPortfolio();
      await fetchAssetEntry();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      requestData();
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
          <Route
            path="/portfolio/:portfolioId"
            element={
              <RequireAuth>
                <PorfolioDetails />
              </RequireAuth>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
