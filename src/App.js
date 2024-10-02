import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';

function App() {

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/forgotpassword" Component={ForgotPassword} />
          <Route path='/resetpassword/:id/:token' Component={ResetPassword} />
          <Route path="/" Component={HomePage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
