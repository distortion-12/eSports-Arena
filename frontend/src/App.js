import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import Components & Pages
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import RegisterPage from './pages/RegisterPage';
import AuthPage from './pages/AuthPage';
import LiveWatchPage from './pages/LiveWatchPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './PrivateRoute';
import TournamentDetailPage from './pages/TournamentDetailPage'; // 1. Import the new page

// Helper Function to set auth token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get('/api/auth');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleLoginSuccess = async (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    try {
      const res = await axios.get('/api/auth');
      setUser(res.data);
    } catch (err) {
      console.error('Could not fetch user after login:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header user={user} logout={handleLogout} />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/watch/live" element={<LiveWatchPage />} />
          
          {/* --- NEW TOURNAMENT DETAIL ROUTE --- */}
          {/* 2. This route uses a dynamic :id parameter */}
          <Route path="/tournament/:id" element={<TournamentDetailPage />} />

          {/* Auth Route (Public but redirects if logged in) */}
          <Route 
            path="/auth" 
            element={
              user ? <Navigate to="/" /> : <AuthPage onLoginSuccess={handleLoginSuccess} />
            } 
          />

          {/* Private Routes */}
          <Route 
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/register"
            element={
              <PrivateRoute user={user}>
                <RegisterPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;