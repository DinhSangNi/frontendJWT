import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from './pages/HomePage';

function App() {

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/" Component={HomePage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
