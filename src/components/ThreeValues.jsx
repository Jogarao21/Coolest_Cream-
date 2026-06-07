import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Image, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Import existing images
import imgReal       from '../assets/Real Ingredients Only.png';
import imgCommunity  from '../assets/Community First.png';
import imgSustain    from '../assets/Sustainable Scoops.png';
import imgLove       from '../assets/Made with Love.png';

const CARDS = [
  { id: 1, src: imgReal,      title: 'Real Ingredients Only' },
  { id: 2, src: imgCommunity, title: 'Community First' },
  { id: 3, src: imgSustain,   title: 'Sustainable Scoops' },
  { id: 4, src: imgLove,      title: 'Made with Love' },
];

function ValueCard({ position, src, scale = 1, delay = 0 }) {
  const group = useRef();
  
  // Add a simple entrance animation & interactive rotation
  const time = useRef(0);
  
  useFrame((state, delta) => {
    time.current += delta;
    
    // Interactive mouse rotation
    const t = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (t.x * Math.PI) / 10, 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -(t.y * Math.PI) / 10, 0.1);
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.15} 
      floatIntensity={0.5} 
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={group} position={position} scale={scale}>
        {/* Glassmorphism Box */}
        <RoundedBox args={[3.2, 2.2, 0.15]} radius={0.08} smoothness={4} castShadow>
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.4}
            roughness={0.15}
            thickness={1}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
        {/* The Card Image */}
        <Image url={src} position={[0, 0, 0.08]} scale={[3.0, 2.0]} transparent />
      </group>
    </Float>
  );
}

function Scene() {
  const { viewport } = useThree();
  
  // Calculate responsive layout
  const layoutInfo = useMemo(() => {
    let layout = [];
    let scale = 1;

    // 1 column for very small mobile
    if (viewport.width < 7.5) {
      scale = Math.min(1, viewport.width / 4.0) * 1.2;
      layout = [
        [0,  3.8 * scale, 0],
        [0,  1.25 * scale, 0],
        [0, -1.3 * scale, 0],
        [0, -3.85 * scale, 0],
      ];
    } 
    // 2x2 grid for tablets
    else if (viewport.width < 13) {
      scale = Math.min(1.1, viewport.width / 8.0) * 1.2;
      layout = [
        [-1.75 * scale,  1.25 * scale, 0],
        [ 1.75 * scale,  1.25 * scale, 0],
        [-1.75 * scale, -1.3 * scale, 0],
        [ 1.75 * scale, -1.3 * scale, 0],
      ];
    } 
    // 4x1 row for desktop
    else {
      scale = Math.min(1.1, viewport.width / 15.0) * 1.2;
      layout = [
        [-5.25 * scale, 0, 0],
        [-1.75 * scale, 0, 0],
        [ 1.75 * scale, 0, 0],
        [ 5.25 * scale, 0, 0],
      ];
    }
    
    return { layout, scale };
  }, [viewport.width]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      
      {CARDS.map((card, i) => (
        <ValueCard 
          key={card.id} 
          src={card.src} 
          position={layoutInfo.layout[i]} 
          scale={layoutInfo.scale} 
          delay={i * 0.15}
        />
      ))}
      
      <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={20} blur={2.5} far={4} />
      <Environment preset="city" />
    </>
  );
}

export default function ThreeValues() {
  return (
    <div className="three-values-container" aria-label="Interactive 3D Value Cards">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} shadows>
        <Scene />
      </Canvas>
    </div>
  );
}
