import { Routes, Route } from "react-router-dom";
import Auth from "views/Auth/Auth";
import "./App.scss";
import { RequireAuth } from "components/auth/RequireAuth";
import Home from "views/Home/Home";
import Asset from "views/Asset/Asset";

function App() {  
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }></Route>
        <Route path="/asset" element={
          <RequireAuth>
            <Asset />
          </RequireAuth>
        } />

      </Routes>
    </div>
  );
}

export default App;
