import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Floating Particles ─── */
function Particles({ count = 120 }) {
  const mesh = useRef();
  const time = useRef(0);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Brand colours: pink (#EC008C) and purple (#3F007F)
    const brandColors = [
      new THREE.Color('#EC008C'),
      new THREE.Color('#FF4DB5'),
      new THREE.Color('#3F007F'),
      new THREE.Color('#6B00D6'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28;   // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;   // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;   // z

      const c = brandColors[Math.floor(Math.random() * brandColors.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  const speeds = useMemo(
    () => Array.from({ length: count }, () => 0.0015 + Math.random() * 0.003),
    [count]
  );

  useFrame((state, delta) => {
    if (!mesh.current) return;
    time.current += delta;
    const t = time.current;
    const posAttr = mesh.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      // Drift upward and slightly sideways
      posAttr.array[i * 3 + 1] += speeds[i];
      posAttr.array[i * 3]     += Math.sin(t * 0.3 + i) * 0.0018;

      // Wrap when off-screen
      if (posAttr.array[i * 3 + 1] > 6.5) {
        posAttr.array[i * 3 + 1] = -6.5;
        posAttr.array[i * 3]     = (Math.random() - 0.5) * 28;
      }
    }
    posAttr.needsUpdate = true;

    // Very slow rotation of the whole cluster
    mesh.current.rotation.y = Math.sin(t * 0.04) * 0.06;
    mesh.current.rotation.x = Math.sin(t * 0.025) * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Floating Glowing Orbs ─── */
function GlowOrb({ position, color, speed = 0.5, amplitude = 0.4 }) {
  const mesh = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    time.current += delta;
    const t = time.current;
    mesh.current.position.y = position[1] + Math.sin(t * speed) * amplitude;
    mesh.current.position.x = position[0] + Math.cos(t * speed * 0.7) * (amplitude * 0.5);
    mesh.current.material.opacity = 0.25 + Math.sin(t * speed * 1.3) * 0.1;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.55, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} depthWrite={false} />
    </mesh>
  );
}

/* ─── Main Scene ─── */
function ThreeScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <Particles count={150} />
      <GlowOrb position={[-6,  1.5, -2]} color="#EC008C" speed={0.38} amplitude={0.55} />
      <GlowOrb position={[ 6, -1.5, -3]} color="#3F007F" speed={0.45} amplitude={0.4}  />
      <GlowOrb position={[ 0,  2.5, -4]} color="#FF4DB5" speed={0.28} amplitude={0.7}  />
      <GlowOrb position={[-4, -2,   -2]} color="#6B00D6" speed={0.52} amplitude={0.35} />
    </>
  );
}

/* ─── Canvas wrapper ─── */
export default function ThreeBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ThreeScene />
      </Canvas>
    </div>
  );
}
