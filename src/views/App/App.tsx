import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Auth from 'views/Auth/Auth';
import './App.scss';
import { RequireAuth } from 'components/auth/RequireAuth';
import Home from 'views/Home/Home';
import Asset from 'views/Asset/Asset';
import { getAsset } from 'http-services/asset';
import { setAssets } from 'store/asset';
import PageLoading from 'components/page-loading/PageLoading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const authenticated = useSelector((state: any) => state.auth.authenticated);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        const response = await getAsset();
        console.log(response);
        dispatch(setAssets(response));
      } finally {
        setIsLoading(false);
      }
    };

    if (authenticated) {
      fetchAssets();
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
        </Routes>
      )}
    </div>
  );
}

export default App;
