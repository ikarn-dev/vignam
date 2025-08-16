'use client';

import { Canvas as R3FCanvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { ErrorBoundary } from '../ErrorBoundary';

interface CanvasProps {
  children: ReactNode;
  className?: string;
  enableControls?: boolean;
}

export const Canvas = ({ children, className = '', enableControls = false }: CanvasProps) => {
  return (
    <div className={`w-full h-full ${className}`} role="img" aria-label="3D Interactive Model">
      <ErrorBoundary>
        <R3FCanvas
          camera={{ position: [0, 0, 18], fov: 35 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true
          }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 100 } }}
        >
          <Suspense fallback={null}>
            <Environment files="/textures/forest.exr" />
            {enableControls && (
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            )}
            {children}
          </Suspense>
        </R3FCanvas>
      </ErrorBoundary>
    </div>
  );
};