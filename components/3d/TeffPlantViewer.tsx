'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function TeffPlantViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [variety, setVariety] = useState<'nech' | 'tikur' | 'sergegna'>('nech');
  const grainMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.8, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0E0C0A, 0);

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 5.5;

    // Lighting
    scene.add(new THREE.AmbientLight(0xFFF8E7, 0.8));
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.5);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0xC59334, 0.9, 6);
    pointLight.position.set(-2, 1, -2);
    scene.add(pointLight);

    // Panicle Spikelet Cluster Group
    const panicleGroup = new THREE.Group();

    // Main Stem
    const stemGeo = new THREE.CylinderGeometry(0.02, 0.035, 2.6, 16);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x8F8152, roughness: 0.7 });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.position.set(0, -0.4, 0);
    panicleGroup.add(stemMesh);

    // Grains
    const grainMat = new THREE.MeshStandardMaterial({
      color: 0xEFE2BA,
      roughness: 0.4,
      metalness: 0.15,
    });
    grainMaterialRef.current = grainMat;

    const grainGeo = new THREE.SphereGeometry(1, 12, 12);
    const branchGeo = new THREE.CylinderGeometry(0.008, 0.012, 0.35, 8);
    const branchMat = new THREE.MeshStandardMaterial({ color: 0xA39665, roughness: 0.8 });

    for (let i = 0; i < 45; i++) {
      const angle = (i * 0.45) % (Math.PI * 2);
      const heightVal = -0.8 + (i / 45) * 2.2;
      const spread = 0.15 + (1 - Math.abs(heightVal) / 1.5) * 0.4;
      const x = Math.cos(angle) * spread;
      const z = Math.sin(angle) * spread;

      const cluster = new THREE.Group();
      cluster.position.set(x, heightVal, z);

      const branch = new THREE.Mesh(branchGeo, branchMat);
      branch.position.set(-x * 0.3, -0.05, -z * 0.3);
      cluster.add(branch);

      const grain = new THREE.Mesh(grainGeo, grainMat);
      grain.position.set(0, 0.05, 0);
      grain.scale.set(0.065, 0.1, 0.065);
      cluster.add(grain);

      panicleGroup.add(cluster);
    }

    scene.add(panicleGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      controls.update();

      panicleGroup.rotation.y = elapsedTime * 0.15;
      panicleGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.05;

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

  const handleSwitchVariety = (v: 'nech' | 'tikur' | 'sergegna') => {
    setVariety(v);
    if (grainMaterialRef.current) {
      if (v === 'nech') grainMaterialRef.current.color.setHex(0xEFE2BA);
      if (v === 'tikur') grainMaterialRef.current.color.setHex(0x663B23);
      if (v === 'sergegna') grainMaterialRef.current.color.setHex(0xA67B48);
    }
    soundEngine.playTizitaChime && soundEngine.playTizitaChime(v === 'nech' ? 0 : v === 'tikur' ? 1 : 2);
  };

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Variety Selector Ribbon */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-ethiopia-obsidian/90 p-1.5 rounded-full border border-ethiopia-teff-500/40 backdrop-blur-lg shadow-2xl">
        <button
          onClick={() => handleSwitchVariety('nech')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            variety === 'nech'
              ? 'bg-ethiopia-teff-200 text-ethiopia-earth-900 shadow-md font-bold'
              : 'text-ethiopia-earth-300 hover:text-ethiopia-teff-300'
          }`}
        >
          Nech (White)
        </button>
        <button
          onClick={() => handleSwitchVariety('tikur')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            variety === 'tikur'
              ? 'bg-ethiopia-clay-600 text-ethiopia-linen shadow-md font-bold'
              : 'text-ethiopia-earth-300 hover:text-ethiopia-teff-300'
          }`}
        >
          Tikur (Brown)
        </button>
        <button
          onClick={() => handleSwitchVariety('sergegna')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            variety === 'sergegna'
              ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian shadow-md font-bold'
              : 'text-ethiopia-earth-300 hover:text-ethiopia-teff-300'
          }`}
        >
          Sergegna (Blend)
        </button>
      </div>
    </div>
  );
}
