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
import Komari from './pages/Komari';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const GLOBAL_CUSTOM_PRESET = {
  customHeadHtml: `<meta name="theme-color" content="#090611" />\n<meta name="color-scheme" content="dark" />`,
  customHeadCss: `:root{--neon-cyan:#00e5ff;--neon-pink:#ff2bd6;--neon-purple:#7a5cff;--bg-deep:#070611;}\nbody{background:radial-gradient(1200px 600px at 12% -10%,rgba(0,229,255,.12),transparent 60%),radial-gradient(900px 500px at 100% 0,rgba(255,43,214,.14),transparent 55%),var(--bg-deep);}\n::selection{background:rgba(0,229,255,.35);color:#fff;}\n.cyber-chip{border:1px solid rgba(0,229,255,.35);border-radius:999px;padding:.2rem .6rem;}`,
  customHeadJs: `window.__CYBER_THEME__={name:'NeonPulse',version:'1.0.0'};`,
  customBodyHtml: `<div class="global-neon-ribbon" aria-hidden="true"></div>\n<div class="global-cyber-noise" aria-hidden="true"></div>`,
  customBodyCss: `.global-neon-ribbon{position:fixed;inset:0;pointer-events:none;z-index:6;background:linear-gradient(120deg,transparent 0%,rgba(0,229,255,.05) 35%,rgba(122,92,255,.06) 55%,transparent 100%);mix-blend-mode:screen;animation:ribbonShift 16s linear infinite;}\n.global-cyber-noise{position:fixed;inset:0;pointer-events:none;z-index:5;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");}\n@keyframes ribbonShift{0%{transform:translateX(-6%)}50%{transform:translateX(6%)}100%{transform:translateX(-6%)}}`,
  customBodyJs: `(function(){const k='cyber-last-visit';const now=new Date().toISOString();localStorage.setItem(k,now);})();`,
  customFooterHtml: `<div class="global-footer-note">NEON ARCHIVE · PERSONAL SIGNAL ONLINE</div>`,
  customFooterCss: `.global-footer-note{margin:1rem auto 1.6rem;text-align:center;letter-spacing:.18em;font-size:.7rem;color:rgba(200,220,255,.72);text-transform:uppercase;}`,
  customFooterJs: `console.log('[CyberPreset] footer hook ready');`,
};

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
      <Route path="/komari" element={<Komari />} />
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
  const [customBodyHtml, setCustomBodyHtml] = useState('');
  const [customFooterHtml, setCustomFooterHtml] = useState('');

  useEffect(() => {
    const applyGlobalCustomBlocks = async () => {
      try {
        const response = await configAPI.getPublicConfigs();
        const cfg = {
          ...GLOBAL_CUSTOM_PRESET,
          ...(response.data || {}),
        };

        const cleanupSelector = [
          '[data-custom-slot="head-html"]',
          '[data-custom-slot="head-css"]',
          '[data-custom-slot="head-js"]',
          '[data-custom-slot="body-css"]',
          '[data-custom-slot="body-js"]',
          '[data-custom-slot="footer-css"]',
          '[data-custom-slot="footer-js"]',
        ].join(',');

        document.querySelectorAll(cleanupSelector).forEach((node) => node.remove());

        if (cfg.customHeadHtml) {
          const htmlContainer = document.createElement('div');
          htmlContainer.innerHTML = cfg.customHeadHtml;
          Array.from(htmlContainer.children).forEach((element) => {
            const cloned = element.cloneNode(true);
            cloned.setAttribute('data-custom-slot', 'head-html');
            document.head.appendChild(cloned);
          });
        }

        if (cfg.customHeadCss) {
          const styleEl = document.createElement('style');
          styleEl.setAttribute('data-custom-slot', 'head-css');
          styleEl.textContent = cfg.customHeadCss;
          document.head.appendChild(styleEl);
        }

        if (cfg.customHeadJs) {
          const scriptEl = document.createElement('script');
          scriptEl.setAttribute('data-custom-slot', 'head-js');
          scriptEl.text = cfg.customHeadJs;
          document.head.appendChild(scriptEl);
        }

        if (cfg.customBodyCss) {
          const bodyStyleEl = document.createElement('style');
          bodyStyleEl.setAttribute('data-custom-slot', 'body-css');
          bodyStyleEl.textContent = cfg.customBodyCss;
          document.head.appendChild(bodyStyleEl);
        }

        if (cfg.customBodyJs) {
          const bodyScriptEl = document.createElement('script');
          bodyScriptEl.setAttribute('data-custom-slot', 'body-js');
          bodyScriptEl.text = cfg.customBodyJs;
          document.body.appendChild(bodyScriptEl);
        }

        if (cfg.customFooterCss) {
          const footerStyleEl = document.createElement('style');
          footerStyleEl.setAttribute('data-custom-slot', 'footer-css');
          footerStyleEl.textContent = cfg.customFooterCss;
          document.head.appendChild(footerStyleEl);
        }

        if (cfg.customFooterJs) {
          const footerScriptEl = document.createElement('script');
          footerScriptEl.setAttribute('data-custom-slot', 'footer-js');
          footerScriptEl.text = cfg.customFooterJs;
          document.body.appendChild(footerScriptEl);
        }

        setCustomBodyHtml(cfg.customBodyHtml || '');
        setCustomFooterHtml(cfg.customFooterHtml || '');
      } catch (error) {
        // ignore global custom injection failure
      }
    };

    applyGlobalCustomBlocks();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="scanline-overlay"></div>
          <div className="hex-pattern"></div>
          <CyberpunkEffects />
          <CustomCursor />
          <Navigation />
          {customBodyHtml && (
            <div
              className="global-custom-body"
              data-custom-render="body"
              dangerouslySetInnerHTML={{ __html: customBodyHtml }}
            />
          )}
          <AnimatedRoutes />
          {customFooterHtml && (
            <div
              className="global-custom-footer"
              data-custom-render="footer"
              dangerouslySetInnerHTML={{ __html: customFooterHtml }}
            />
          )}
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
