'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function AbsitCookingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState(75);

  const absitMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const absitMeshRef = useRef<THREE.Mesh | null>(null);
  const tempRef = useRef(75);

  useEffect(() => {
    tempRef.current = temperature;
  }, [temperature]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.0, 4.2);

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

    const hearthLight = new THREE.PointLight(0xFF5500, 1.8, 3);
    hearthLight.position.set(0, -0.6, 0);
    scene.add(hearthLight);

    const potGroup = new THREE.Group();
    potGroup.position.set(0, -0.2, 0);

    // Clay Pot (Dist)
    const potGeo = new THREE.CylinderGeometry(0.75, 0.65, 0.8, 32, 1, true);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x6B321B, roughness: 0.85, side: THREE.DoubleSide });
    const pot = new THREE.Mesh(potGeo, potMat);
    potGroup.add(pot);

    const baseGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.08, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x542412, roughness: 0.9 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(0, -0.4, 0);
    potGroup.add(base);

    // Boiling Absit Starch Porridge
    const absitGeo = new THREE.CylinderGeometry(0.72, 0.68, 0.4, 32);
    const absitMat = new THREE.MeshStandardMaterial({ color: 0xD6A85C, roughness: 0.35 });
    absitMatRef.current = absitMat;
    const absitMesh = new THREE.Mesh(absitGeo, absitMat);
    absitMesh.position.set(0, 0.2, 0);
    absitMeshRef.current = absitMesh;
    potGroup.add(absitMesh);

    // Steam Puffs
    const steamGeo = new THREE.SphereGeometry(1, 8, 8);
    const steamMat = new THREE.MeshBasicMaterial({ color: 0xEAE3D9, transparent: true, opacity: 0.35 });
    const steamPuffs: { mesh: THREE.Mesh; x: number; z: number; speed: number }[] = [];

    for (let i = 0; i < 14; i++) {
      const p = new THREE.Mesh(steamGeo, steamMat);
      const x = (Math.random() - 0.5) * 0.45;
      const z = (Math.random() - 0.5) * 0.45;
      const speed = 0.4 + Math.random() * 0.4;
      p.position.set(x, 0.3 + Math.random(), z);
      potGroup.add(p);
      steamPuffs.push({ mesh: p, x, z, speed });
    }

    scene.add(potGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const t = clock.getElapsedTime();
      const currentTemp = tempRef.current;

      if (absitMeshRef.current) {
        absitMeshRef.current.position.y = 0.2 + Math.sin(t * 4) * (currentTemp / 100) * 0.025;
      }

      steamPuffs.forEach((sp) => {
        sp.mesh.position.y = 0.3 + ((sp.mesh.position.y + 0.015 * sp.speed) % 1.5);
        const scale = 0.03 + (sp.mesh.position.y / 1.5) * 0.07;
        sp.mesh.scale.set(scale, scale, scale);
      });

      hearthLight.intensity = (currentTemp / 50) * (1.5 + Math.sin(t * 3) * 0.3);

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

  const handleTempChange = (val: number) => {
    setTemperature(val);
    if (absitMatRef.current) {
      if (val >= 70) {
        absitMatRef.current.roughness = 0.25;
        absitMatRef.current.color.setHex(0xD6A85C);
      } else {
        absitMatRef.current.roughness = 0.8;
        absitMatRef.current.color.setHex(0xE8D3AF);
      }
    }
  };

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Temperature & Gelatinization Monitor */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xs mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl text-xs">
        <div className="flex items-center justify-between font-bold text-ethiopia-linen mb-1.5">
          <span className="text-ethiopia-teff-400">Absit Heat Level</span>
          <span className="font-mono text-ethiopia-clay-400">{temperature}°C</span>
        </div>

        <input
          type="range"
          min="50"
          max="95"
          value={temperature}
          onChange={(e) => {
            handleTempChange(Number(e.target.value));
            if (Number(e.target.value) >= 70) soundEngine.playSizzle && soundEngine.playSizzle();
          }}
          className="w-full accent-ethiopia-clay-500 cursor-pointer h-1.5 bg-ethiopia-earth-800 rounded-lg mb-2"
        />

        <div className="p-2 rounded-lg bg-ethiopia-earth-900/80 border border-ethiopia-earth-700/50 text-[11px]">
          {temperature < 68 ? (
            <span className="text-ethiopia-earth-300">
              🌡️ Warming: Amylose starches are hydrating in boiling water...
            </span>
          ) : temperature <= 82 ? (
            <span className="text-ethiopia-teff-300 font-medium">
              ✨ Gelatinization Zone! Starches crosslink into a glossy binder matrix.
            </span>
          ) : (
            <span className="text-ethiopia-clay-300">
              🔥 Ready! Cool to lukewarm and blend back into the main pot.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
