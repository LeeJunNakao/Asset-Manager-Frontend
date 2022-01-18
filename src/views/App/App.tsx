import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Auth from 'views/Auth/Auth';
import './App.scss';
import { RequireAuth } from 'components/auth/RequireAuth';
import Home from 'views/Home/Home';
import Asset from 'views/Asset/Asset';
import { getAsset } from 'http-services/asset';
import { setAssets } from 'store/asset';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await getAsset();
      dispatch(setAssets(response));
    };

    fetchAssets();
  }, []);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
