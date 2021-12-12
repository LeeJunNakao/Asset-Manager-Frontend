import { Routes, Route } from "react-router-dom";
import Auth from "views/Auth/Auth";
import "./App.scss";
import { RequireAuth } from "components/auth/RequireAuth";
import Home from "views/Home/Home";

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

      </Routes>
    </div>
  );
}

export default App;
