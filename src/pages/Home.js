import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Text } from '@react-three/drei';
import { configAPI, imageAPI, projectAPI } from '../api';
import './Home.css';

function HeroCore({ isMobile }) {
  const groupRef = useRef();
  const ringRef = useRef();
  const textRef = useRef();

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.16;
      groupRef.current.position.y = Math.sin(elapsed * 0.9) * 0.06;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.32;
      ringRef.current.rotation.x += delta * 0.08;
    }

    if (textRef.current) {
      textRef.current.position.y = 0.24 + Math.sin(elapsed * 1.3) * 0.04;
    }
  });

  const xShift = isMobile ? 0.1 : 1.35;

  return (
    <group position={[xShift, -0.1, 0]}>
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.36}>
        <group ref={groupRef}>
          <mesh position={[0, -0.02, 0]}>
            <cylinderGeometry args={[1.05, 1.22, 0.25, 80, 1, true]} />
            <meshStandardMaterial color="#0e1530" metalness={0.78} roughness={0.3} emissive="#11193a" />
          </mesh>

          <mesh ref={ringRef} rotation={[1.24, 0, 0]} position={[0, 0.18, 0]}>
            <torusGeometry args={[1.32, 0.04, 24, 220]} />
            <meshStandardMaterial color="#ff2bd6" emissive="#4a103f" />
          </mesh>

          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.16, 32, 32]} />
            <meshStandardMaterial color="#7a5cff" emissive="#2a1f66" />
          </mesh>

          <group ref={textRef} position={[0, 0.24, 0.02]}>
            <Text
              fontSize={0.44}
              letterSpacing={0.05}
              maxWidth={3}
              anchorX="center"
              anchorY="middle"
              color="#00e5ff"
              outlineWidth={0.03}
              outlineColor="#ff2bd6"
            >
              ZAKI
            </Text>
          </group>
        </group>
      </Float>
    </group>
  );
}

function HeroScene({ isMobile, fxLevel, particlesEnabled, particleMultiplier }) {
  const starCount = Math.max(
    220,
    Math.floor((fxLevel === 'low' ? 620 : isMobile ? 980 : 1800) * (particleMultiplier || 1))
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0.45, 0.32, isMobile ? 8.4 : 7.3]} fov={isMobile ? 66 : 54} />
      <ambientLight intensity={0.36} />
      <pointLight position={[3.8, 3.4, 3.2]} intensity={1.05} color="#00e5ff" />
      <pointLight position={[-4.1, -1.5, 1.9]} intensity={0.85} color="#ff2bd6" />
      <pointLight position={[0, 2.5, -4.6]} intensity={0.75} color="#7a5cff" />

      {particlesEnabled && <Stars radius={90} depth={45} count={starCount} factor={3} saturation={0} fade speed={0.5} />}

      <HeroCore isMobile={isMobile} />
    </>
  );
}

function Home() {
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileTip, setShowMobileTip] = useState(false);

  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [config, setConfig] = useState({
    heroImage: '',
    siteTitle: 'ZAKI.DEV',
    siteDescription: '赛博朋克时代的网络数字游民',
    homeDesktopTip: '沉浸式数字作品集 · 交互式体验',
    homeMobileTip: '向下探索更多作品与相册',
    homeStat1Value: '3+',
    homeStat1Label: 'PROJECTS',
    homeStat2Value: '∞',
    homeStat2Label: 'CREATIVITY',
    homeStat3Value: '100%',
    homeStat3Label: 'PASSION',
    aacCustomHeader: '个人展示空间',
    aacCustomBody: '记录灵感、作品与生活碎片。',
    aacCustomFooter: '感谢浏览我的数字角落。',
    komariEnabled: true,
    komariTitle: 'KOMARI Monitor',
    komariDescription: '我的监控面板与系统状态中心',
    komariUrl: '/komari',
    komariPanelUrl: '',
    komariEmbedEnabled: false,
    komariEmbedHeight: 480,
    integrationModules: [],
    seoHomeTitle: 'ZAKI.DEV - 首页',
    seoHomeDescription: '赛博朋克时代的网络数字游民',
    fxPreset: 'medium',
    fxEnablePost: true,
    fxEnableParticles: true,
    fxNoiseOpacity: 0.04,
    fxParticleMultiplier: 1,
  });

  const baseUrl = useMemo(() => process.env.REACT_APP_API_URL?.replace('/api', '') || window.location.origin, []);
  const toAbs = (url) => (url?.startsWith('http') ? url : `${baseUrl}${url || ''}`);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 900;
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

  useEffect(() => {
    if (!galleryImages.length) return;
    setGalleryIndex((previous) => previous % galleryImages.length);
  }, [galleryImages]);

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const timer = window.setInterval(() => {
      setGalleryIndex((previous) => (previous + 1) % galleryImages.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [galleryImages]);

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
        aacCustomHeader: publicConfig.aacCustomHeader || previous.aacCustomHeader,
        aacCustomBody: publicConfig.aacCustomBody || previous.aacCustomBody,
        aacCustomFooter: publicConfig.aacCustomFooter || previous.aacCustomFooter,
        komariEnabled: publicConfig.komariEnabled !== false,
        komariTitle: publicConfig.komariTitle || previous.komariTitle,
        komariDescription: publicConfig.komariDescription || previous.komariDescription,
        komariUrl: publicConfig.komariUrl || previous.komariUrl,
        komariPanelUrl: publicConfig.komariPanelUrl || previous.komariPanelUrl,
        komariEmbedEnabled: publicConfig.komariEmbedEnabled === true,
        komariEmbedHeight: Number(publicConfig.komariEmbedHeight) || previous.komariEmbedHeight,
        integrationModules: Array.isArray(publicConfig.integrationModules) ? publicConfig.integrationModules : previous.integrationModules,
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
        imageAPI.getImagesByCategory('gallery', { limit: 16 }),
      ]);
      setFeaturedProjects(projectsRes.data || []);
      setGalleryImages(galleryRes.data || []);
    } catch (fetchError) {
      // ignore
    }
  };

  const showPrevGallery = () => {
    if (galleryImages.length <= 1) return;
    setGalleryIndex((previous) => (previous - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextGallery = () => {
    if (galleryImages.length <= 1) return;
    setGalleryIndex((previous) => (previous + 1) % galleryImages.length);
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
          backgroundImage: `linear-gradient(rgba(8, 6, 18, 0.78), rgba(8, 6, 18, 0.9)), url(${toAbs(config.heroImage)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        } : {}}
      >
        <div className="hero-canvas-layer">
          <Suspense fallback={<div className="loading"><div className="spinner" /><p>Loading 3D Scene...</p></div>}>
            <Canvas shadows gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' }} dpr={isMobile ? [1, 1.5] : [1, 2]}>
              <HeroScene
                isMobile={isMobile}
                fxLevel={config.fxPreset}
                particlesEnabled={config.fxEnableParticles}
                particleMultiplier={config.fxParticleMultiplier}
              />
            </Canvas>
          </Suspense>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">{config.aacCustomHeader || 'NEURAL PORTFOLIO / 2026'}</p>
            <h1 className="hero-title glitch" data-text={config.siteTitle}>{config.siteTitle}</h1>
            <p className="hero-subtitle">// {config.siteDescription}</p>
            <p className="hero-description desktop-only">{config.homeDesktopTip}</p>
            <p className="hero-description mobile-only">{config.homeMobileTip}</p>

            <div className="hero-actions">
              <Link to="/projects" className="hero-btn primary">查看项目</Link>
              <button type="button" className="hero-btn ghost" onClick={() => document.getElementById('home-more')?.scrollIntoView({ behavior: 'smooth' })}>继续下滑</button>
            </div>

            <div className="hero-stats">
              <div className="stat-item"><span className="stat-value">{config.homeStat1Value}</span><span className="stat-label">{config.homeStat1Label}</span></div>
              <div className="stat-divider" />
              <div className="stat-item"><span className="stat-value">{config.homeStat2Value}</span><span className="stat-label">{config.homeStat2Label}</span></div>
              <div className="stat-divider" />
              <div className="stat-item"><span className="stat-value">{config.homeStat3Value}</span><span className="stat-label">{config.homeStat3Label}</span></div>
            </div>
          </div>

          <div className="hero-side-panel">
            <div className="hud-card">
              <span className="hud-label">CURRENT MODE</span>
              <span className="hud-value">CYBERPUNK EXPERIENCE</span>
            </div>
            <div className="hud-card">
              <span className="hud-label">FOCUS</span>
              <span className="hud-value">WEBGL / UX / FULL STACK</span>
            </div>
            <div className="hud-card">
              <span className="hud-label">STATUS</span>
              <span className="hud-value">ONLINE · BUILDING</span>
            </div>
          </div>
        </div>

        {showMobileTip && <div className="mobile-tip">💡 向下滑动查看更多内容</div>}

      </section>

      <section id="home-more" className="home-more-section">
        <div className="home-more-inner">
          <h2>精选项目</h2>
          <div className="home-project-grid">
            {featuredProjects.slice(0, 6).map((project) => (
              <a key={project._id} href={project.url} target="_blank" rel="noreferrer" className="home-project-card">
                <div className="home-project-title">{project.title}</div>
                <div className="home-project-desc">{project.description?.slice(0, 78)}{project.description?.length > 78 ? '...' : ''}</div>
              </a>
            ))}
          </div>

          <h2>赛博相册</h2>
          <div className="home-gallery-carousel">
            {galleryImages.length > 0 ? (
              <>
                <div className="home-gallery-stage">
                  <img
                    key={galleryImages[galleryIndex]?._id}
                    src={toAbs(galleryImages[galleryIndex]?.url || galleryImages[galleryIndex]?.thumbnail)}
                    alt={galleryImages[galleryIndex]?.title || 'gallery'}
                    className="home-gallery-main"
                  />
                  {galleryImages.length > 1 && (
                    <>
                      <button type="button" className="gallery-nav gallery-prev" onClick={showPrevGallery}>‹</button>
                      <button type="button" className="gallery-nav gallery-next" onClick={showNextGallery}>›</button>
                    </>
                  )}
                </div>

                {galleryImages.length > 1 && (
                  <div className="home-gallery-thumbs">
                    {galleryImages.slice(0, 8).map((image, index) => (
                      <button
                        key={image._id}
                        type="button"
                        className={`home-gallery-thumb ${index === galleryIndex ? 'active' : ''}`}
                        onClick={() => setGalleryIndex(index)}
                        aria-label={`切换到第${index + 1}张图片`}
                      >
                        <img src={toAbs(image.thumbnail || image.url)} alt={image.title} className="home-gallery-item" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="home-gallery-empty">暂无相册图片，请在后台图库添加 gallery 分类图片</div>
            )}
          </div>

          <h2>个人随笔</h2>
          <div className="home-blog-card">
            <p>{config.aacCustomBody}</p>
          </div>

          {config.komariEnabled && (
            <>
              <h2>{config.komariTitle}</h2>
              <a className="home-komari-card" href={config.komariUrl} target="_blank" rel="noreferrer">
                <div className="home-komari-title">{config.komariTitle}</div>
                <div className="home-komari-desc">{config.komariDescription}</div>
                <div className="home-komari-action">进入 Komari 面板 →</div>
              </a>
              {config.komariEmbedEnabled && (
                <div className="home-komari-embed-wrap">
                  <iframe
                    className="home-komari-embed"
                    src={config.komariPanelUrl || config.komariUrl}
                    title="Komari Embed"
                    loading="lazy"
                    style={{ height: `${Math.max(280, Number(config.komariEmbedHeight) || 480)}px` }}
                  />
                </div>
              )}
            </>
          )}

          {Array.isArray(config.integrationModules) && config.integrationModules.some((item) => item?.enabled !== false) && (
            <>
              <h2>更多集成</h2>
              <div className="home-integration-grid">
                {config.integrationModules.filter((item) => item && item.enabled !== false).slice(0, 12).map((item, index) => (
                  <a key={`${item.title || 'integration'}-${index}`} className="home-integration-card" href={item.url || '#'} target="_blank" rel="noreferrer">
                    <div className="home-integration-title">{item.title || 'Untitled Integration'}</div>
                    <div className="home-integration-desc">{item.description || 'No description'}</div>
                  </a>
                ))}
              </div>
            </>
          )}

          <h2>常见问题</h2>
          <div className="home-faq-list">
            {[
              { question: '这个站点主要用途是什么？', answer: '用于展示个人审美、作品和记录，不是商业合作页。' },
              { question: '内容可以在后台自己改吗？', answer: '可以。你现在可以在设置里直接自定义头部、正文、页脚文案。' },
              { question: '为什么保留赛博相册？', answer: '它是视觉中心之一，但我已缩小尺寸并优化排版，不再喧宾夺主。' },
            ].map((item, index) => (
              <button
                key={item.question}
                type="button"
                className={`faq-item ${openFaqIndex === index ? 'active' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
              >
                <span className="faq-question">{item.question}</span>
                <span className="faq-toggle">{openFaqIndex === index ? '−' : '+'}</span>
                {openFaqIndex === index && <span className="faq-answer">{item.answer}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="footer-brand">ZAKI.DEV</div>
          <div className="footer-links">
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText('zaki@example.com');
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 1500);
                } catch (clipboardError) {
                  // ignore
                }
              }}
            >
              {copiedEmail ? '已复制邮箱' : '复制邮箱'}
            </button>
            <Link to="/about">Profile</Link>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} ZAKI · {config.aacCustomFooter || 'Cyberpunk Portfolio'}</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
