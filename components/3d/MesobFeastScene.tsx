'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function MesobFeastScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gurshaCount, setGurshaCount] = useState(0);
  const [activeDish, setActiveDish] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.8, 4.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0E0C0A, 0);

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2.5;
    controls.maxDistance = 6.0;

    // Lighting
    scene.add(new THREE.AmbientLight(0xFFF8F0, 0.8));
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.6);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const feastGroup = new THREE.Group();
    feastGroup.position.set(0, -0.4, 0);

    // Mesob Table Pedestal (Hourglass shape)
    const baseGeo = new THREE.CylinderGeometry(1.3, 1.7, 0.6, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x8A4325, roughness: 0.75 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(0, -0.6, 0);
    feastGroup.add(base);

    // Mesob Woven Basin
    const basinGeo = new THREE.CylinderGeometry(2.0, 1.4, 0.4, 32);
    const basinMat = new THREE.MeshStandardMaterial({ color: 0xC59334, roughness: 0.7 });
    const basin = new THREE.Mesh(basinGeo, basinMat);
    basin.position.set(0, -0.15, 0);
    feastGroup.add(basin);

    // Base Layer of Fresh Spongy Injera
    const injeraGeo = new THREE.CylinderGeometry(1.85, 1.85, 0.04, 32);
    const injeraMat = new THREE.MeshStandardMaterial({ color: 0xCDB38B, roughness: 0.92 });
    const injera = new THREE.Mesh(injeraGeo, injeraMat);
    injera.position.set(0, 0.08, 0);
    feastGroup.add(injera);

    // 1. Doro Wat (Center) + Egg
    const doroGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.06, 24);
    const doroMat = new THREE.MeshStandardMaterial({ color: 0x8B261D, roughness: 0.5 });
    const doro = new THREE.Mesh(doroGeo, doroMat);
    doro.position.set(0, 0.12, 0);
    feastGroup.add(doro);

    const eggGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const eggMat = new THREE.MeshStandardMaterial({ color: 0xF7F1E1, roughness: 0.3 });
    const egg = new THREE.Mesh(eggGeo, eggMat);
    egg.position.set(0.08, 0.18, 0);
    feastGroup.add(egg);

    // 2. Misir Wat (Red Lentils - Top)
    const misirGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 20);
    const misirMat = new THREE.MeshStandardMaterial({ color: 0xA33B20, roughness: 0.6 });
    const misir = new THREE.Mesh(misirGeo, misirMat);
    misir.position.set(0, 0.12, -0.9);
    feastGroup.add(misir);

    // 3. Gomen (Collard Greens - Right)
    const gomenGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 20);
    const gomenMat = new THREE.MeshStandardMaterial({ color: 0x2B5329, roughness: 0.7 });
    const gomen = new THREE.Mesh(gomenGeo, gomenMat);
    gomen.position.set(0.9, 0.12, 0);
    feastGroup.add(gomen);

    // 4. Shiro (Chickpeas - Bottom)
    const shiroGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.05, 20);
    const shiroMat = new THREE.MeshStandardMaterial({ color: 0xD99B38, roughness: 0.5 });
    const shiro = new THREE.Mesh(shiroGeo, shiroMat);
    shiro.position.set(0, 0.12, 0.9);
    feastGroup.add(shiro);

    // 5. Ayib (Curd Cheese - Left)
    const ayibGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 20);
    const ayibMat = new THREE.MeshStandardMaterial({ color: 0xF4EFE6, roughness: 0.9 });
    const ayib = new THREE.Mesh(ayibGeo, ayibMat);
    ayib.position.set(-0.9, 0.12, 0);
    feastGroup.add(ayib);

    // Rolled Injeras on rim
    const rollGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 16);
    const rollMat = new THREE.MeshStandardMaterial({ color: 0xCDB38B, roughness: 0.9 });

    [-1.2, 1.2].forEach((x, idx) => {
      const roll = new THREE.Mesh(rollGeo, rollMat);
      roll.rotation.set(0, 0.4 * (idx === 0 ? 1 : -1), Math.PI / 2);
      roll.position.set(x, 0.14, -0.9);
      feastGroup.add(roll);
    });

    scene.add(feastGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const t = clock.getElapsedTime();
      feastGroup.position.y = -0.4 + Math.sin(t * 0.8) * 0.03;

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

  const dishesList = [
    { id: 'doro', name: 'Doro Wat (ዶሮ ወጥ)', desc: 'Celebratory slow-simmered berbere chicken & hard-boiled egg.' },
    { id: 'misir', name: 'Misir Wat (ምስር ወጥ)', desc: 'Spiced red lentils infused with garlic, ginger, and berbere.' },
    { id: 'gomen', name: 'Gomen (ጎመን)', desc: 'Tender collard greens sautéed with onions and cardamom.' },
    { id: 'shiro', name: 'Shiro (ሽሮ)', desc: 'Velvety, aromatic roasted chickpea and pea flour stew.' },
    { id: 'ayib', name: 'Ayib (አይብ)', desc: 'Mild curd cheese that gently balances spicy berbere stews.' },
  ];

  const handleShareGursha = () => {
    setGurshaCount((prev) => prev + 1);
    soundEngine.playTizitaChime && soundEngine.playTizitaChime(4);
  };

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Dish Selectors on top */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap justify-center gap-1.5">
        {dishesList.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setActiveDish(activeDish === d.id ? null : d.id);
              soundEngine.playTizitaChime && soundEngine.playTizitaChime(2);
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all border shadow-lg backdrop-blur-md ${
              activeDish === d.id
                ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian border-ethiopia-teff-400'
                : 'bg-ethiopia-obsidian/90 text-ethiopia-teff-300 border-ethiopia-teff-500/30'
            }`}
          >
            {d.name.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {activeDish && (
        <div className="absolute top-14 left-4 right-4 z-30 max-w-xs mx-auto p-3 bg-ethiopia-earth-900/95 border border-ethiopia-teff-500/50 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 text-xs">
          <div className="font-bold text-ethiopia-teff-400 mb-0.5">
            {dishesList.find((d) => d.id === activeDish)?.name}
          </div>
          <p className="text-ethiopia-earth-200 leading-tight">
            {dishesList.find((d) => d.id === activeDish)?.desc}
          </p>
        </div>
      )}

      {/* Interactive Gursha Love Counter */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xs mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl flex flex-col items-center gap-2 text-xs">
        <button
          onClick={handleShareGursha}
          className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-1.5"
        >
          <span>❤️ Share a Gursha (ጉርሻ አጉርስ)</span>
        </button>
        {gurshaCount > 0 && (
          <p className="text-[11px] text-ethiopia-teff-300 text-center font-medium animate-pulse">
            You shared {gurshaCount} {gurshaCount === 1 ? 'gursha' : 'gurshas'} of love around the Mesob!
          </p>
        )}
      </div>
    </div>
  );
}
