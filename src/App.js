import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { UserSearch } from "./screens/UserSearch";
import { ViewUser } from "./screens/ViewUser";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Search Users</Link>
            </li>
          </ul>
        </div>

        <div className="main">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/users" element={<UserSearch />} />
            <Route path="/user/:id" element={<ViewUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
