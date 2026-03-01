import React, { useEffect, useState } from 'react';
import { configAPI } from '../api';
import './Komari.css';

function Komari() {
  const [config, setConfig] = useState({
    komariTitle: 'KOMARI Monitor',
    komariDescription: '探针与监控界面',
    komariPanelUrl: '/komari-panel',
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await configAPI.getPublicConfigs();
        const cfg = response.data || {};
        setConfig((prev) => ({
          ...prev,
          komariTitle: cfg.komariTitle || prev.komariTitle,
          komariDescription: cfg.komariDescription || prev.komariDescription,
          komariPanelUrl: cfg.komariPanelUrl || '/komari-panel',
        }));
      } catch (error) {
        // ignore
      }
    };

    fetchConfig();
  }, []);

  return (
    <div className="komari-page">
      <div className="komari-container">
        <h1 className="komari-title">{config.komariTitle}</h1>
        <p className="komari-desc">{config.komariDescription}</p>

        {config.komariPanelUrl ? (
          <iframe
            className="komari-frame"
            src={config.komariPanelUrl}
            title="Komari Panel"
            loading="lazy"
          />
        ) : (
          <div className="komari-empty">
            <p>还没配置 Komari 面板地址。</p>
            <p>请到 `设置 -> 首页设置` 里填写 `Komari 面板地址`（例如你的 Komari 实际部署 URL）。</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Komari;
