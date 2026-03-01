import React, { useEffect, useState } from 'react';
import { configAPI } from '../api';
import './CustomCursor.css';

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const init = async () => {
      try {
        const res = await configAPI.getPublicConfigs();
        const cfg = res.data || {};
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
        setEnabled(!reduced && !mobile && cfg.fxEnableCursor !== false);
      } catch (error) {
        setEnabled(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const handler = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="custom-cursor"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      aria-hidden="true"
    />
  );
}

export default CustomCursor;
