'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';

interface PerformanceStats {
  fps: number;
  memory: number;
  drawCalls: number;
}

interface PerformanceMemory {
  usedJSHeapSize: number;
}

interface ExtendedPerformance extends Performance {
  memory?: PerformanceMemory;
}

export const PerformanceMonitor = ({ showStats = false }: { showStats?: boolean }) => {
  const { gl } = useThree();
  const [stats, setStats] = useState<PerformanceStats>({ fps: 0, memory: 0, drawCalls: 0 });
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    frameCount.current++;
    const currentTime = performance.now();
    
    // Update FPS every second
    if (currentTime - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      
      setStats({
        fps,
        memory: (performance as ExtendedPerformance).memory?.usedJSHeapSize 
          ? Math.round((performance as ExtendedPerformance).memory.usedJSHeapSize / 1048576) 
          : 0,
        drawCalls: gl.info.render.calls
      });
      
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
  });

  // Auto-adjust quality based on performance
  useEffect(() => {
    if (stats.fps < 30 && stats.fps > 0) {
      // Reduce quality if FPS is too low
      gl.setPixelRatio(Math.min(window.devicePixelRatio * 0.8, 1));
    } else if (stats.fps > 50) {
      // Restore quality if performance is good
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }, [stats.fps, gl]);

  if (!showStats) return null;

  return (
    <div className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded text-xs font-mono z-50">
      <div>FPS: {stats.fps}</div>
      <div>Memory: {stats.memory}MB</div>
      <div>Draw Calls: {stats.drawCalls}</div>
    </div>
  );
};