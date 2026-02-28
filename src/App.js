import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import './App.css';

function RotatingCube() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.5 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? '#00ff88' : '#0088ff'} />
    </mesh>
  );
}

function FloatingSphere({ position }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ff0088" wireframe />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <RotatingCube />
      <FloatingSphere position={[-3, 0, 0]} />
      <FloatingSphere position={[3, 0, 0]} />
      <FloatingSphere position={[0, -2, 0]} />
      <OrbitControls enableZoom={true} enablePan={true} />
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
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // 检测 WebGL 支持
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setError('Your device does not support WebGL. Please try on a different device or browser.');
    }
  }, []);

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
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000');
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      <div className="info">
        <h1>🚀 React Three Fiber Demo</h1>
        <p>拖动鼠标旋转视角 | 滚轮缩放 | 鼠标悬停立方体变色</p>
      </div>
    </div>
  );
}

export default App;
