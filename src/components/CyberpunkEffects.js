import React, { useEffect, useMemo, useState } from 'react';
import { configAPI } from '../api';
import './CyberpunkEffects.css';

function CyberpunkEffects() {
  const [config, setConfig] = useState({
    fxPreset: 'medium',
    fxEnableLaserRain: true,
    fxEnableSmoke: true,
    fxEnableGlitchOverlay: true,
    fxEnableNeonOrbs: true,
    fxEffectDensity: 1,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await configAPI.getPublicConfigs();
        const cfg = response.data || {};
        setConfig({
          fxPreset: cfg.fxPreset || 'medium',
          fxEnableLaserRain: cfg.fxEnableLaserRain !== false,
          fxEnableSmoke: cfg.fxEnableSmoke !== false,
          fxEnableGlitchOverlay: cfg.fxEnableGlitchOverlay !== false,
          fxEnableNeonOrbs: cfg.fxEnableNeonOrbs !== false,
          fxEffectDensity: typeof cfg.fxEffectDensity === 'number' ? cfg.fxEffectDensity : 1,
        });
      } catch (error) {
        // fallback defaults
      }
    };
    load();
  }, []);

  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const mobile = useMemo(() => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent), []);

  if (reduced || config.fxPreset === 'off') return null;

  const densityFactor = Math.max(0.5, Math.min(2, config.fxEffectDensity || 1));
  const laserCount = Math.floor((mobile ? 22 : 48) * densityFactor * (config.fxPreset === 'high' ? 1.2 : config.fxPreset === 'low' ? 0.7 : 1));
  const orbCount = Math.floor((mobile ? 5 : 10) * densityFactor * (config.fxPreset === 'high' ? 1.3 : 1));

  return (
    <>
      {config.fxEnableLaserRain && (
        <div className="laser-rain" aria-hidden="true">
          {Array.from({ length: laserCount }).map((_, index) => (
            <span
              key={`laser-${index}`}
              className="laser-drop"
              style={{
                left: `${(index / laserCount) * 100}%`,
                animationDelay: `${(index % 12) * 0.18}s`,
                animationDuration: `${2.4 + (index % 7) * 0.22}s`,
              }}
            />
          ))}
        </div>
      )}

      {config.fxEnableSmoke && (
        <div className="cyber-smoke" aria-hidden="true">
          <div className="smoke-layer smoke-1" />
          <div className="smoke-layer smoke-2" />
          <div className="smoke-layer smoke-3" />
        </div>
      )}

      {config.fxEnableNeonOrbs && (
        <div className="neon-orbs" aria-hidden="true">
          {Array.from({ length: orbCount }).map((_, index) => (
            <span
              key={`orb-${index}`}
              className="neon-orb"
              style={{
                left: `${6 + ((index * 11) % 88)}%`,
                top: `${72 + ((index * 7) % 24)}%`,
                animationDelay: `${(index % 9) * 0.35}s`,
                animationDuration: `${6 + (index % 6) * 1.2}s`,
                '--drift-x': `${-20 + (index % 5) * 10}px`,
              }}
            />
          ))}
        </div>
      )}

      {config.fxEnableGlitchOverlay && <div className="global-glitch-overlay" aria-hidden="true" />}
    </>
  );
}

export default CyberpunkEffects;
