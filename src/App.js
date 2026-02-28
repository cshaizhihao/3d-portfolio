import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, PerspectiveCamera } from '@react-three/drei';
import './App.css';

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
      
      {/* 移动端减少星星数量 */}
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
        // 移动端优化触摸操作
        touches={{
          ONE: 0, // 单指旋转
          TWO: 2  // 双指缩放
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

function App() {
  const [error, setError] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileTip, setShowMobileTip] = useState(false);

  useEffect(() => {
    // 检测移动设备
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768;
      setIsMobile(mobile);
      
      // 移动端首次访问显示操作提示
      if (mobile && !localStorage.getItem('mobileTipShown')) {
        setShowMobileTip(true);
        localStorage.setItem('mobileTipShown', 'true');
        setTimeout(() => setShowMobileTip(false), 5000);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // WebGL 检测
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setError('Your device does not support WebGL.');
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSaveScene = () => {
    setShowSaveDialog(true);
  };

  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h1>⚠️ WebGL Not Supported</h1>
          <p>{error}</p>
          <p className="error-hint">请尝试使用 Chrome、Safari 或 Firefox 浏览器</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          shadows
          gl={{ 
            antialias: !isMobile, // 移动端关闭抗锯齿提升性能
            alpha: false,
            powerPreference: isMobile ? 'default' : 'high-performance'
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]} // 移动端降低像素比
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      </Suspense>
      
      <div className="info">
        <h1>🚀 3D Portfolio</h1>
        <p className="desktop-only">拖动旋转 | 滚轮缩放 | 悬停交互</p>
        <p className="mobile-only">单指旋转 | 双指缩放</p>
      </div>

      {showMobileTip && (
        <div className="mobile-tip">
          <p>💡 单指拖动旋转，双指缩放</p>
        </div>
      )}

      <div className="controls">
        <button className="btn-save" onClick={handleSaveScene}>
          💾 {isMobile ? '保存' : '保存场景'}
        </button>
      </div>

      {showSaveDialog && (
        <div className="modal-overlay" onClick={() => setShowSaveDialog(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>💾 保存场景</h2>
            <p>后端开发中... 敬请期待！</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowSaveDialog(false)}>
                知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
