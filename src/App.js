import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { configAPI } from './api';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import CyberpunkEffects from './components/CyberpunkEffects';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const [enableTransitions, setEnableTransitions] = useState(true);

  useEffect(() => {
    const fetchFx = async () => {
      try {
        const res = await configAPI.getPublicConfigs();
        const cfg = res.data || {};
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setEnableTransitions(!reduced && cfg.fxEnableTransitions !== false);
      } catch (error) {
        setEnableTransitions(true);
      }
    };
    fetchFx();
  }, []);

  const page = (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );

  if (!enableTransitions) return page;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
      >
        {page}
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="scanline-overlay"></div>
          <div className="hex-pattern"></div>
          <CyberpunkEffects />
          <CustomCursor />
          <Navigation />
          <AnimatedRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a1a1a',
                color: '#00e5ff',
                border: '1px solid #00e5ff',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
              },
              success: {
                iconTheme: {
                  primary: '#00e5ff',
                  secondary: '#000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff2bd6',
                  secondary: '#000',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
