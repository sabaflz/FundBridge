import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Survey from './pages/Survey';
import './App.css';

function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="landing-page">
      <div className="logo-container">
        {isDarkMode ? (
          <img src="/logo_dark.png" alt="Dark Logo" className="logo" />
        ) : (
          <img src="/logo_light.png" alt="Light Logo" className="logo" />
        )}
      </div>
      <h1>Welcome to FundBridge</h1>
      <p className="tagline">Match. Collaborate. Fund.</p>
      <div className="button-container">
        <Link to="/signin" className="signin-button">Sign In</Link>
        <Link to="/survey" className="register-button">Register</Link>
      </div>
    </div>
  );
}

function SignInPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Signing in with:', username, password);
  };

  return (
    <div className="signin-page">
      <div className="logo-container">
        {isDarkMode ? (
          <img src="/logo_dark.png" alt="Dark Logo" className="logo" />
        ) : (
          <img src="/logo_light.png" alt="Light Logo" className="logo" />
        )}
      </div>
      <h2>Sign In to FundBridge</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </Router>
  );
}

export default App;
