import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/Auth';

function App() {
  
  return (
    <Router>
    <div> 
      <nav>
        <ul>
          <li>
              <Link to="/">LandingPage</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route  path="/" element = {Auth(LandingPage,null)}/>
        <Route  path="/login" element = {Auth(LoginPage,false)}/>
        <Route  path="/register" element = {Auth(RegisterPage,false)}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
