import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, PerspectiveCamera } from '@react-three/drei';
import { configAPI, leadAPI } from '../api';
import './Home.css';

function RotatingCube() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.3 : 1}
      castShadow
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial 
        color={hovered ? '#00ff88' : '#0088ff'} 
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function FloatingSphere({ position, color }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh position={position} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
}

function Scene({ isMobile }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 10 : 8]} fov={isMobile ? 70 : 60} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      <Stars 
        radius={80} 
        depth={40} 
        count={isMobile ? 1000 : 2000} 
        factor={3} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
      
      <RotatingCube />
      <FloatingSphere position={[-2.5, 0, 0]} color="#ff0088" />
      <FloatingSphere position={[2.5, 0, 0]} color="#00ff88" />
      <FloatingSphere position={[0, -2, 0]} color="#8800ff" />
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        maxDistance={15}
        minDistance={3}
        touches={{
          ONE: 0,
          TWO: 2
        }}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading 3D Scene...</p>
    </div>
  );
}

function Home() {
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileTip, setShowMobileTip] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', budget: '', message: '' });
  const [config, setConfig] = useState({
    heroImage: '',
    siteTitle: 'ZAKI.DEV',
    siteDescription: '赛博朋克时代的网络数字游民',
    homeDesktopTip: '拖动旋转 | 滚轮缩放 | 悬停交互',
    homeMobileTip: '单指旋转 | 双指缩放',
    homeStat1Value: '3+',
    homeStat1Label: 'PROJECTS',
    homeStat2Value: '∞',
    homeStat2Label: 'CREATIVITY',
    homeStat3Value: '100%',
    homeStat3Label: 'PASSION',
    seoHomeTitle: 'ZAKI.DEV - 首页',
    seoHomeDescription: '赛博朋克时代的网络数字游民',
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768;

      setIsMobile(mobile);
      
      if (mobile && !localStorage.getItem('mobileTipShown')) {
        setShowMobileTip(true);
        localStorage.setItem('mobileTipShown', 'true');
        setTimeout(() => setShowMobileTip(false), 5000);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 检查 WebGL 支持
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setError('Your device does not support WebGL.');
    }

    // 加载配置
    fetchConfig();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await configAPI.getPublicConfigs();
      const publicConfig = response.data || {};
      setConfig({
        heroImage: publicConfig.heroImage || '',
        siteTitle: publicConfig.siteTitle || 'ZAKI.DEV',
        siteDescription: publicConfig.siteDescription || '赛博朋克时代的网络数字游民',
        homeDesktopTip: publicConfig.homeDesktopTip || '拖动旋转 | 滚轮缩放 | 悬停交互',
        homeMobileTip: publicConfig.homeMobileTip || '单指旋转 | 双指缩放',
        homeStat1Value: publicConfig.homeStat1Value || '3+',
        homeStat1Label: publicConfig.homeStat1Label || 'PROJECTS',
        homeStat2Value: publicConfig.homeStat2Value || '∞',
        homeStat2Label: publicConfig.homeStat2Label || 'CREATIVITY',
        homeStat3Value: publicConfig.homeStat3Value || '100%',
        homeStat3Label: publicConfig.homeStat3Label || 'PASSION',
        seoHomeTitle: publicConfig.seoHomeTitle || 'ZAKI.DEV - 首页',
        seoHomeDescription: publicConfig.seoHomeDescription || '赛博朋克时代的网络数字游民',
      });
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://141.98.197.210:5000';
    return `${baseUrl}${url}`;
  };

  const setMetaDescription = (content) => {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  useEffect(() => {
    document.title = config.seoHomeTitle || 'ZAKI.DEV - 首页';
    setMetaDescription(config.seoHomeDescription || '赛博朋克时代的网络数字游民');
  }, [config.seoHomeTitle, config.seoHomeDescription]);

  const handleLeadChange = (event) => {
    const { name, value } = event.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setSubmittingLead(true);
    try {
      await leadAPI.createLead({ ...leadForm, source: 'home-form' });
      setLeadForm({ name: '', email: '', budget: '', message: '' });
    } catch (error) {
      // ignore toast in home to avoid noisy UX
    } finally {
      setSubmittingLead(false);
    }
  };

  if (error) {
    return (
      <div className="home-page">
        <div className="error">
          <h1>⚠️ WebGL Not Supported</h1>
          <p>{error}</p>
          <p className="error-hint">请尝试使用 Chrome、Safari 或 Firefox 浏览器</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page" style={config.heroImage ? {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${getImageUrl(config.heroImage)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    } : {}}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          shadows
          gl={{ 
            antialias: !isMobile,
            alpha: true,
            powerPreference: isMobile ? 'default' : 'high-performance'
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      </Suspense>
      
      <div className="hero-content">
        <h1 className="hero-title glitch" data-text={config.siteTitle}>
          {config.siteTitle}
        </h1>
        <p className="hero-subtitle">// {config.siteDescription}</p>
        <p className="hero-description desktop-only">
          {config.homeDesktopTip}
        </p>
        <p className="hero-description mobile-only">
          {config.homeMobileTip}
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">{config.homeStat1Value}</span>
            <span className="stat-label">{config.homeStat1Label}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{config.homeStat2Value}</span>
            <span className="stat-label">{config.homeStat2Label}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{config.homeStat3Value}</span>
            <span className="stat-label">{config.homeStat3Label}</span>
          </div>
        </div>
      </div>

      {showMobileTip && (
        <div className="mobile-tip">
          💡 单指拖动旋转，双指缩放
        </div>
      )}

      <div className="lead-floating-form">
        <h3>快速咨询</h3>
        <form onSubmit={handleLeadSubmit}>
          <input name="name" value={leadForm.name} onChange={handleLeadChange} placeholder="你的称呼" required />
          <input name="email" type="email" value={leadForm.email} onChange={handleLeadChange} placeholder="你的邮箱" required />
          <input name="budget" value={leadForm.budget} onChange={handleLeadChange} placeholder="预算（可选）" />
          <textarea name="message" value={leadForm.message} onChange={handleLeadChange} placeholder="你的需求" rows="3" required />
          <button type="submit" disabled={submittingLead}>{submittingLead ? '提交中...' : '提交需求'}</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
