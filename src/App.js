import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import LandingPage from './pages/LandingPage';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<LandingPage />} exact path='/' />
          <Route element={<Admin />} exact path='/admin' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
