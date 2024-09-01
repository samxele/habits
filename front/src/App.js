import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './styling/ThemeContext';
import LandingPage from './landing/LandingPage';
import AuthPage from './auth/AuthPage';
import Dashboard from './dash/Dashboard';
import GlobalStyle from './styling/GlobalStyle';
import Tasks from './tasks/Tasks';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;