'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function PreparationScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeUtensil, setActiveUtensil] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.5, 4.8);

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
    controls.maxDistance = 6.5;

    // Lighting
    scene.add(new THREE.AmbientLight(0xFFEEDD, 0.8));
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.5);
    dirLight.position.set(4, 6, 3);
    scene.add(dirLight);

    const prepGroup = new THREE.Group();
    prepGroup.position.set(0, -0.4, 0);

    // Grinding table base
    const tableGeo = new THREE.CylinderGeometry(2.5, 2.7, 0.4, 32);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x2E1C14, roughness: 0.9 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(0, -0.8, 0);
    prepGroup.add(table);

    // 1. Borena / Dist (Center Clay Pot)
    const borenaGeo = new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const borenaMat = new THREE.MeshStandardMaterial({ color: 0x7A3E26, roughness: 0.85, side: THREE.DoubleSide });
    const borena = new THREE.Mesh(borenaGeo, borenaMat);
    borena.position.set(0, -0.3, 0);
    prepGroup.add(borena);

    // White Teff Flour inside Borena
    const flourGeo = new THREE.CylinderGeometry(0.78, 0.7, 0.15, 24);
    const flourMat = new THREE.MeshStandardMaterial({ color: 0xEFE9DC, roughness: 0.98 });
    const flour = new THREE.Mesh(flourGeo, flourMat);
    flour.position.set(0, -0.2, 0);
    prepGroup.add(flour);

    // 2. Akambalo (Conical Lid on Left)
    const lidGeo = new THREE.ConeGeometry(0.75, 0.65, 24);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0xB08D57, roughness: 0.7 });
    const lid = new THREE.Mesh(lidGeo, lidMat);
    lid.position.set(-1.6, -0.4, 0.4);
    lid.rotation.z = 0.2;
    prepGroup.add(lid);

    // 3. Sefed (Circular Woven Mat on Right)
    const sefedGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.04, 32);
    const sefedMat = new THREE.MeshStandardMaterial({ color: 0xD4B26F, roughness: 0.8 });
    const sefed = new THREE.Mesh(sefedGeo, sefedMat);
    sefed.position.set(1.6, -0.55, 0.2);
    sefed.rotation.set(-0.1, 0, 0.1);
    prepGroup.add(sefed);

    // 4. Sifet (Sieve near Front)
    const sieveGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.1, 24);
    const sieveMat = new THREE.MeshStandardMaterial({ color: 0x9C8262, roughness: 0.6 });
    const sieve = new THREE.Mesh(sieveGeo, sieveMat);
    sieve.position.set(0.4, -0.55, 1.2);
    sieve.rotation.set(0.1, 0.3, 0);
    prepGroup.add(sieve);

    scene.add(prepGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      const t = clock.getElapsedTime();
      prepGroup.position.y = -0.4 + Math.sin(t * 0.8) * 0.03;
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

  const utensilsList = [
    { id: 'borena', name: 'Borena (ቦረና)', desc: 'Terracotta pot that regulates sourdough fermentation thermal stability.' },
    { id: 'akambalo', name: 'Akambalo (አክምባሎ)', desc: 'Conical woven lid trapping steam to cook top injera layer without scorching.' },
    { id: 'sefed', name: 'Sefed (ሰፌድ)', desc: 'Grass woven mat used for winnowing grain and lifting hot baked injera.' },
    { id: 'sifet', name: 'Sifet (ስፌት)', desc: 'Fine sieve used to sift ground teff flour into a velvet powder.' },
  ];

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Utensils Hotspots Selector */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap justify-center gap-2">
        {utensilsList.map((u) => (
          <button
            key={u.id}
            onClick={() => {
              setActiveUtensil(activeUtensil === u.id ? null : u.id);
              soundEngine.playTizitaChime && soundEngine.playTizitaChime(2);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xl backdrop-blur-md border ${
              activeUtensil === u.id
                ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian border-ethiopia-teff-400 scale-105'
                : 'bg-ethiopia-obsidian/90 text-ethiopia-teff-300 border-ethiopia-teff-500/40 hover:border-ethiopia-teff-400'
            }`}
          >
            {u.name}
          </button>
        ))}
      </div>

      {/* Active Utensil Detail Popover */}
      {activeUtensil && (
        <div className="absolute top-4 left-4 right-4 z-30 max-w-sm mx-auto p-3.5 bg-ethiopia-earth-900/95 border border-ethiopia-teff-500/50 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 text-xs">
          <div className="font-bold text-ethiopia-teff-400 mb-1">
            {utensilsList.find((u) => u.id === activeUtensil)?.name}
          </div>
          <p className="text-ethiopia-earth-200 leading-relaxed">
            {utensilsList.find((u) => u.id === activeUtensil)?.desc}
          </p>
        </div>
      )}
    </div>
  );
}
