'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function MixingBowlScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hydration, setHydration] = useState(65);
  const [stirSpeed, setStirSpeed] = useState(1);

  const batterMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const paddleGroupRef = useRef<THREE.Group | null>(null);
  const batterMeshRef = useRef<THREE.Mesh | null>(null);
  const speedRef = useRef(1);

  useEffect(() => {
    speedRef.current = stirSpeed;
  }, [stirSpeed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.2, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0E0C0A, 0);

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2.2;
    controls.maxDistance = 5.5;

    // Lighting
    scene.add(new THREE.AmbientLight(0xFFF5EA, 0.8));
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.4);
    dirLight.position.set(3, 5, 3);
    scene.add(dirLight);

    const mixGroup = new THREE.Group();
    mixGroup.position.set(0, -0.2, 0);

    // Terracotta Clay Bowl
    const bowlGeo = new THREE.SphereGeometry(1.2, 32, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const bowlMat = new THREE.MeshStandardMaterial({ color: 0x8A4325, roughness: 0.8, side: THREE.DoubleSide });
    const bowl = new THREE.Mesh(bowlGeo, bowlMat);
    mixGroup.add(bowl);

    // Swirling Batter Body
    const batterGeo = new THREE.CylinderGeometry(1.05, 0.85, 0.5, 32);
    const batterMat = new THREE.MeshStandardMaterial({ color: 0xD8C29D, roughness: 0.5 });
    batterMatRef.current = batterMat;
    const batter = new THREE.Mesh(batterGeo, batterMat);
    batter.position.set(0, 0.15, 0);
    batterMeshRef.current = batter;
    mixGroup.add(batter);

    // Wooden Stirring Paddle
    const paddleGroup = new THREE.Group();
    paddleGroup.position.set(0, 0.5, 0);

    const handleGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.2, 16);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x5C3A21, roughness: 0.7 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0, 0.4, 0);
    paddleGroup.add(handle);

    const bladeGeo = new THREE.BoxGeometry(0.16, 0.35, 0.04);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x4A2E18, roughness: 0.6 });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.set(0, -0.2, 0);
    paddleGroup.add(blade);

    paddleGroupRef.current = paddleGroup;
    mixGroup.add(paddleGroup);

    scene.add(mixGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const t = clock.getElapsedTime() * speedRef.current;
      if (paddleGroupRef.current) {
        paddleGroupRef.current.position.x = Math.cos(t * 2) * 0.35;
        paddleGroupRef.current.position.z = Math.sin(t * 2) * 0.35;
        paddleGroupRef.current.rotation.z = Math.sin(t * 2) * 0.3;
      }
      if (batterMeshRef.current) {
        batterMeshRef.current.rotation.y = t * 0.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleHydrationChange = (val: number) => {
    setHydration(val);
    if (batterMatRef.current) {
      const hRatio = (val - 50) / 50;
      batterMatRef.current.color.setRGB(0.85 - hRatio * 0.1, 0.76 - hRatio * 0.08, 0.6 - hRatio * 0.08);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Hydration & Stir Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xs mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl flex flex-col gap-2.5 text-xs">
        <div className="flex items-center justify-between text-ethiopia-teff-300 font-bold">
          <span>Hydration Level</span>
          <span className="font-mono">{hydration}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="95"
          value={hydration}
          onChange={(e) => {
            handleHydrationChange(Number(e.target.value));
            soundEngine.playPour && soundEngine.playPour();
          }}
          className="w-full accent-ethiopia-clay-500 cursor-pointer h-1.5 bg-ethiopia-earth-800 rounded-lg"
        />

        <div className="flex items-center justify-between pt-1 border-t border-ethiopia-earth-800 text-[11px] text-ethiopia-earth-300">
          <span>Stir Speed:</span>
          <div className="flex gap-1.5">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => {
                  setStirSpeed(spd);
                  soundEngine.playTizitaChime && soundEngine.playTizitaChime(Math.round(spd * 2));
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  stirSpeed === spd
                    ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian'
                    : 'bg-ethiopia-earth-800 text-ethiopia-earth-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
