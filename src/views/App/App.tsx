import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setIsLoading(true);
        const response = await getAsset();
        dispatch(setAssets(response));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

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
