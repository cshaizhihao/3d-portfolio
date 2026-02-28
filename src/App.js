import React, { useRef, useState, Suspense } from 'react';
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

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {/* 减少星星数量提升性能 */}
      <Stars radius={80} depth={40} count={2000} factor={3} saturation={0} fade speed={0.5} />
      
      <RotatingCube />
      <FloatingSphere position={[-2.5, 0, 0]} color="#ff0088" />
      <FloatingSphere position={[2.5, 0, 0]} color="#00ff88" />
      <FloatingSphere position={[0, -2, 0]} color="#8800ff" />
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        maxDistance={15}
        minDistance={3}
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

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setError('Your device does not support WebGL.');
    }
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
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      
      <div className="info">
        <h1>🚀 3D Portfolio</h1>
        <p>拖动旋转 | 滚轮缩放 | 悬停交互</p>
      </div>

      <div className="controls">
        <button className="btn-save" onClick={handleSaveScene}>
          💾 保存场景
        </button>
      </div>

      {showSaveDialog && (
        <div className="modal-overlay" onClick={() => setShowSaveDialog(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>保存场景</h2>
            <p>后端开发中... 敬请期待！</p>
            <button onClick={() => setShowSaveDialog(false)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
