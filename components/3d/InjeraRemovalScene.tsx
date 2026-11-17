'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function InjeraRemovalScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [liftStage, setLiftStage] = useState(0.8);

  const sefedRef = useRef<THREE.Mesh | null>(null);
  const injeraRef = useRef<THREE.Mesh | null>(null);
  const liftRef = useRef(0.8);

  useEffect(() => {
    liftRef.current = liftStage;
  }, [liftStage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.5, 4.6);

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
    scene.add(new THREE.AmbientLight(0xFFF8F0, 0.8));
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.5);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const group = new THREE.Group();
    group.position.set(0, -0.3, 0);

    // Mitad Plate on Left
    const mitadGeo = new THREE.CylinderGeometry(1.7, 1.8, 0.2, 32);
    const mitadMat = new THREE.MeshStandardMaterial({ color: 0x2E1C14, roughness: 0.9 });
    const mitad = new THREE.Mesh(mitadGeo, mitadMat);
    mitad.position.set(-0.8, -0.1, 0);
    group.add(mitad);

    const plateGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.02, 32);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x3A241A, roughness: 0.7 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.set(-0.8, 0.02, 0);
    group.add(plate);

    // Woven Sefed Mat
    const sefedGeo = new THREE.CylinderGeometry(1.65, 1.65, 0.04, 32);
    const sefedMat = new THREE.MeshStandardMaterial({ color: 0xCBB377, roughness: 0.75 });
    const sefed = new THREE.Mesh(sefedGeo, sefedMat);
    sefed.position.set(0.5, 0.1, 0);
    sefedRef.current = sefed;
    group.add(sefed);

    // Injera Resting on Sefed
    const injeraGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.03, 32);
    const injeraMat = new THREE.MeshStandardMaterial({ color: 0xCDB38B, roughness: 0.9 });
    const injera = new THREE.Mesh(injeraGeo, injeraMat);
    injera.position.set(0.5, 0.15, 0);
    injeraRef.current = injera;
    group.add(injera);

    scene.add(group);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const stage = liftRef.current;
      if (sefedRef.current && injeraRef.current) {
        const targetY = 0.05 + stage * 0.45;
        const targetX = 0.5 - stage * 0.5;
        const targetRot = (1 - stage) * 0.15;

        sefedRef.current.position.y = targetY;
        sefedRef.current.position.x = targetX;
        sefedRef.current.rotation.z = targetRot;

        injeraRef.current.position.y = targetY + 0.05;
        injeraRef.current.position.x = targetX;
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

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Lift Slider */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xs mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl flex flex-col gap-2.5 text-xs">
        <div className="flex items-center justify-between font-bold text-ethiopia-linen">
          <span className="text-ethiopia-teff-400">Slide Sefed Underneath</span>
          <span className="font-mono text-ethiopia-clay-400">{Math.round(liftStage * 100)}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={liftStage}
          onChange={(e) => {
            setLiftStage(Number(e.target.value));
            if (Number(e.target.value) >= 0.9) {
              soundEngine.playTizitaChime && soundEngine.playTizitaChime(3);
            }
          }}
          className="w-full accent-ethiopia-clay-500 cursor-pointer h-1.5 bg-ethiopia-earth-800 rounded-lg"
        />

        <p className="text-[11px] text-ethiopia-earth-200 text-center">
          {liftStage < 0.3
            ? '1. Free the edge of the injera with gentle fingertips.'
            : liftStage < 0.8
            ? '2. Slide the circular sefed grass mat in one continuous motion.'
            : '3. Transferred cleanly without tearing! Ready to cool.'}
        </p>
      </div>
    </div>
  );
}
