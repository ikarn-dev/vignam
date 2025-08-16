'use client';

import { useGLTF, useAnimations, useEnvironment } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Object3D } from 'three';

interface Model3DProps {
  modelPath?: string;
  autoPlay?: boolean;
  metallic?: number;
  roughness?: number;
}

export const Model3D = ({
  modelPath = '/models/landing_page_motor.glb',
  autoPlay = true,
  metallic = 0.9,
  roughness = 0.1
}: Model3DProps) => {
  const group = useRef<Group>(null);
  const { viewport, size } = useThree();
  // Load the environment map for metallic reflections
  const envMap = useEnvironment({ files: '/textures/forest.exr' });
  
  // Load the 3D model
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, group);

  // Calculate responsive scale based on viewport
  const getResponsiveScale = () => {
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;
    
    if (isMobile) return [1.5, 1.5, 1.5];
    if (isTablet) return [1.8, 1.8, 1.8];
    return [2.2, 2.2, 2.2];
  };

  // Calculate responsive position based on viewport
  const getResponsivePosition = () => {
    const isMobile = size.width < 768;
    if (isMobile) return [0, -0.5, 0];
    return [0, -0.2, 0];
  };

  // Enhanced material setup and animation control
  useEffect(() => {
    if (!scene) return;

    // Enhance materials for metallic appearance
    scene.traverse((child: Object3D) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        // Apply metallic properties
        child.material.metalness = metallic;
        child.material.roughness = roughness;
        child.material.envMapIntensity = 2.0;
        child.material.needsUpdate = true;

        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, metallic, roughness]);

  // Separate effect for environment map to prevent glitching
  useEffect(() => {
    if (!scene || !envMap) return;

    scene.traverse((child: Object3D) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material.envMap = envMap;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, envMap]);

  // Separate effect for animations with viewport awareness
  useEffect(() => {
    if (!autoPlay || !actions) return;

    // Stop all actions first to prevent overlapping
    if (mixer) {
      mixer.stopAllAction();
    }

    // Start animations immediately
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    });

    // Cleanup function
    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, mixer, autoPlay, size.width]);



  return (
    <group ref={group}>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 5, -5]} intensity={1.2} />
      <pointLight position={[0, 5, 0]} intensity={1.5} />

      <primitive
        object={scene}
        scale={getResponsiveScale()}
        position={getResponsivePosition()}
        rotation={[0, 0, 0]}
      />
    </group>
  );
};

// Preload the model for better performance
useGLTF.preload('/models/landing_page_motor.glb');