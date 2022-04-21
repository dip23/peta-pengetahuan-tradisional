import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
