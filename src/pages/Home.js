import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { configAPI, imageAPI, leadAPI, projectAPI } from '../api';
import './Home.css';

function HeroCore() {
  const knotRef = useRef();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.22;
      knotRef.current.rotation.y += delta * 0.34;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
      ringRef.current.rotation.x += delta * 0.06;
    }
  });

  return (
    <>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.1, 0.28, 180, 28]} />
        <meshStandardMaterial color="#00e5ff" metalness={0.75} roughness={0.2} emissive="#1a1233" />
      </mesh>
      <mesh ref={ringRef} rotation={[0.6, 0.2, 0]}>
        <torusGeometry args={[2.25, 0.06, 24, 180]} />
        <meshStandardMaterial color="#ff2bd6" emissive="#3a0836" />
      </mesh>
      <mesh position={[-2.6, -0.6, -0.4]}>
        <icosahedronGeometry args={[0.36, 0]} />
        <meshStandardMaterial color="#7a5cff" wireframe />
      </mesh>
      <mesh position={[2.4, 0.8, 0.2]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color="#00e5ff" wireframe />
      </mesh>
    </>
  );
}

function HeroScene({ isMobile, fxLevel, particlesEnabled, particleMultiplier }) {
  const starCount = Math.max(
    220,
    Math.floor((fxLevel === 'low' ? 650 : isMobile ? 1100 : 2200) * (particleMultiplier || 1))
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 9.5 : 8]} fov={isMobile ? 70 : 58} />
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color="#00e5ff" />
      <pointLight position={[-4, -3, 2]} intensity={0.9} color="#ff2bd6" />
      <pointLight position={[0, 3, -5]} intensity={0.7} color="#7a5cff" />

      {particlesEnabled && <Stars radius={90} depth={45} count={starCount} factor={3} saturation={0} fade speed={0.65} />}

      <HeroCore />
      <OrbitControls enablePan={false} enableZoom maxDistance={14} minDistance={3.5} enableDamping dampingFactor={0.06} />
    </>
  );
}

function PostEffects({ fxEnabled, fxLevel, noiseOpacity }) {
  if (!fxEnabled || fxLevel === 'off') return null;
  const bloomIntensity = fxLevel === 'high' ? 1.25 : fxLevel === 'medium' ? 0.85 : 0.5;

  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={0.24} luminanceSmoothing={0.2} intensity={bloomIntensity} />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0008, 0.0013]} />
      <Noise opacity={noiseOpacity ?? (fxLevel === 'high' ? 0.06 : 0.03)} premultiply />
      <Vignette eskil={false} offset={0.2} darkness={0.62} />
    </EffectComposer>
  );
}

function Home() {
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileTip, setShowMobileTip] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', budget: '', message: '' });
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

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
    fxPreset: 'medium',
    fxEnablePost: true,
    fxEnableParticles: true,
    fxNoiseOpacity: 0.04,
    fxParticleMultiplier: 1,
  });

  const baseUrl = useMemo(() => process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://141.98.197.210:5000', []);
  const toAbs = (url) => (url?.startsWith('http') ? url : `${baseUrl}${url || ''}`);

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

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) setError('Your device does not support WebGL.');

    void fetchConfig();
    void fetchShowcase();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.title = config.seoHomeTitle || 'ZAKI.DEV - 首页';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = config.seoHomeDescription || '赛博朋克时代的网络数字游民';
  }, [config.seoHomeTitle, config.seoHomeDescription]);

  const fetchConfig = async () => {
    try {
      const response = await configAPI.getPublicConfigs();
      const publicConfig = response.data || {};
      setConfig((previous) => ({
        ...previous,
        heroImage: publicConfig.heroImage || '',
        siteTitle: publicConfig.siteTitle || previous.siteTitle,
        siteDescription: publicConfig.siteDescription || previous.siteDescription,
        homeDesktopTip: publicConfig.homeDesktopTip || previous.homeDesktopTip,
        homeMobileTip: publicConfig.homeMobileTip || previous.homeMobileTip,
        homeStat1Value: publicConfig.homeStat1Value || previous.homeStat1Value,
        homeStat1Label: publicConfig.homeStat1Label || previous.homeStat1Label,
        homeStat2Value: publicConfig.homeStat2Value || previous.homeStat2Value,
        homeStat2Label: publicConfig.homeStat2Label || previous.homeStat2Label,
        homeStat3Value: publicConfig.homeStat3Value || previous.homeStat3Value,
        homeStat3Label: publicConfig.homeStat3Label || previous.homeStat3Label,
        seoHomeTitle: publicConfig.seoHomeTitle || previous.seoHomeTitle,
        seoHomeDescription: publicConfig.seoHomeDescription || previous.seoHomeDescription,
        fxPreset: publicConfig.fxPreset || previous.fxPreset,
        fxEnablePost: publicConfig.fxEnablePost !== false,
        fxEnableParticles: publicConfig.fxEnableParticles !== false,
        fxNoiseOpacity: typeof publicConfig.fxNoiseOpacity === 'number' ? publicConfig.fxNoiseOpacity : previous.fxNoiseOpacity,
        fxParticleMultiplier: typeof publicConfig.fxParticleMultiplier === 'number' ? publicConfig.fxParticleMultiplier : previous.fxParticleMultiplier,
      }));
    } catch (fetchError) {
      // keep defaults
    }
  };

  const fetchShowcase = async () => {
    try {
      const [projectsRes, galleryRes] = await Promise.all([
        projectAPI.getProjects({ status: 'active', limit: 6 }),
        imageAPI.getImagesByCategory('gallery', { limit: 8 }),
      ]);
      setFeaturedProjects(projectsRes.data || []);
      setGalleryImages(galleryRes.data || []);
    } catch (fetchError) {
      // ignore
    }
  };

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
      setLeadOpen(false);
    } catch (submitError) {
      // ignore noisy toast
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
    <div className="home-page">
      <section
        className="hero-stage"
        style={config.heroImage ? {
          backgroundImage: `linear-gradient(rgba(8, 6, 18, 0.72), rgba(8, 6, 18, 0.72)), url(${toAbs(config.heroImage)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        } : {}}
      >
        <Suspense fallback={<div className="loading"><div className="spinner" /><p>Loading 3D Scene...</p></div>}>
          <Canvas shadows gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' }} dpr={isMobile ? [1, 1.5] : [1, 2]}>
            <HeroScene
              isMobile={isMobile}
              fxLevel={config.fxPreset}
              particlesEnabled={config.fxEnableParticles}
              particleMultiplier={config.fxParticleMultiplier}
            />
            <PostEffects fxEnabled={config.fxEnablePost} fxLevel={config.fxPreset} noiseOpacity={config.fxNoiseOpacity} />
          </Canvas>
        </Suspense>

        <div className="hero-content">
          <h1 className="hero-title glitch" data-text={config.siteTitle}>{config.siteTitle}</h1>
          <p className="hero-subtitle">// {config.siteDescription}</p>
          <p className="hero-description desktop-only">{config.homeDesktopTip}</p>
          <p className="hero-description mobile-only">{config.homeMobileTip}</p>

          <div className="hero-stats">
            <div className="stat-item"><span className="stat-value">{config.homeStat1Value}</span><span className="stat-label">{config.homeStat1Label}</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-value">{config.homeStat2Value}</span><span className="stat-label">{config.homeStat2Label}</span></div>
            <div className="stat-divider" />
            <div className="stat-item"><span className="stat-value">{config.homeStat3Value}</span><span className="stat-label">{config.homeStat3Label}</span></div>
          </div>

          <div className="hero-actions">
            <Link to="/projects" className="hero-btn primary">查看项目</Link>
            <button type="button" className="hero-btn ghost" onClick={() => document.getElementById('home-more')?.scrollIntoView({ behavior: 'smooth' })}>继续下滑</button>
          </div>
        </div>

        {showMobileTip && <div className="mobile-tip">💡 单指旋转，双指缩放</div>}

        <button type="button" className="lead-toggle" onClick={() => setLeadOpen((open) => !open)}>
          {leadOpen ? '关闭咨询' : '快速咨询'}
        </button>

        {leadOpen && (
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
        )}
      </section>

      <section id="home-more" className="home-more-section">
        <div className="home-more-inner">
          <h2>精选项目</h2>
          <div className="home-project-grid">
            {featuredProjects.slice(0, 6).map((project) => (
              <a key={project._id} href={project.url} target="_blank" rel="noreferrer" className="home-project-card">
                <div className="home-project-title">{project.title}</div>
                <div className="home-project-desc">{project.description?.slice(0, 72)}{project.description?.length > 72 ? '...' : ''}</div>
              </a>
            ))}
          </div>

          <h2>赛博相册</h2>
          <div className="home-gallery-grid">
            {galleryImages.slice(0, 8).map((image) => (
              <img key={image._id} src={toAbs(image.thumbnail || image.url)} alt={image.title} className="home-gallery-item" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
