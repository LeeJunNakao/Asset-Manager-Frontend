import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Auth from 'views/Auth/Auth';
import './App.scss';
import { RequireAuth } from 'components/auth/RequireAuth';
import Home from 'views/Home/Home';
import Asset from 'views/Asset/Asset';
import Currency from 'views/Currency/Currency';
import { getAsset } from 'http-services/asset';
import { setAssets } from 'store/asset';
import { setCurrencies } from 'store/currency';
import PageLoading from 'components/page-loading/PageLoading';
import { getCurrency } from 'http-services/currency';

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

    if (authenticated) {
      try {
        setIsLoading(true);
        fetchAssets();
        fetchCurrency();
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
            path="/currency"
            element={
              <RequireAuth>
                <Currency />
              </RequireAuth>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
