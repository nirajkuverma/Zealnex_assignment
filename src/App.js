import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './page/Landing';
import LoginPage from './page/Login';
import SignupPage from './page/Signup';
import ForgetPasswordPage from './page/ForgetPassword';
import ChangePasswordPage from './page/ChangePassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={SignupPage} />
        <Route path="/forget_password" Component={ForgetPasswordPage} />
        <Route path="/change_password" Component={ChangePasswordPage} />
      </Routes>
    </div>
  );
}

export default App;
