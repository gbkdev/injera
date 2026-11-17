'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function CookingAynScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLidCovered, setIsLidCovered] = useState(false);
  const [poreDensity, setPoreDensity] = useState(90);

  const lidGroupRef = useRef<THREE.Group | null>(null);
  const steamGroupRef = useRef<THREE.Group | null>(null);
  const poresGroupRef = useRef<THREE.Group | null>(null);
  const isLidCoveredRef = useRef(false);

  useEffect(() => {
    isLidCoveredRef.current = isLidCovered;
  }, [isLidCovered]);

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
    controls.minDistance = 2.2;
    controls.maxDistance = 5.5;

    // Lighting
    scene.add(new THREE.AmbientLight(0xFFF8F0, 0.8));
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.5);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const cookGroup = new THREE.Group();
    cookGroup.position.set(0, -0.3, 0);

    // Clay Mitad Base
    const mitadGeo = new THREE.CylinderGeometry(2.0, 2.1, 0.2, 48);
    const mitadMat = new THREE.MeshStandardMaterial({ color: 0x2E1C14, roughness: 0.85 });
    const mitad = new THREE.Mesh(mitadGeo, mitadMat);
    mitad.position.set(0, -0.1, 0);
    cookGroup.add(mitad);

    // Cooked Injera Disc
    const injeraGeo = new THREE.CylinderGeometry(1.85, 1.85, 0.04, 48);
    const injeraMat = new THREE.MeshStandardMaterial({ color: 0xCBB085, roughness: 0.9 });
    const injera = new THREE.Mesh(injeraGeo, injeraMat);
    injera.position.set(0, 0.05, 0);
    cookGroup.add(injera);

    // Pores Group (Ayn)
    const poresGroup = new THREE.Group();
    const poreGeo = new THREE.CylinderGeometry(0.035, 0.04, 0.02, 12);
    const poreMat = new THREE.MeshStandardMaterial({ color: 0x8C6E43, roughness: 0.9 });

    for (let i = 0; i < 110; i++) {
      const pMesh = new THREE.Mesh(poreGeo, poreMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.2 + Math.sqrt(Math.random()) * 1.5;
      pMesh.position.set(Math.cos(angle) * radius, 0.075, Math.sin(angle) * radius);
      poresGroup.add(pMesh);
    }
    poresGroupRef.current = poresGroup;
    cookGroup.add(poresGroup);

    // Steam Vents Group
    const steamGroup = new THREE.Group();
    const steamGeo = new THREE.SphereGeometry(1, 8, 8);
    const steamMat = new THREE.MeshBasicMaterial({ color: 0xEAE3D9, transparent: true, opacity: 0.25 });
    const steamVents: { mesh: THREE.Mesh; x: number; z: number; speed: number }[] = [];

    for (let i = 0; i < 22; i++) {
      const s = new THREE.Mesh(steamGeo, steamMat);
      const x = (Math.random() - 0.5) * 2.0;
      const z = (Math.random() - 0.5) * 2.0;
      const speed = 0.3 + Math.random() * 0.4;
      s.position.set(x, 0.1, z);
      steamGroup.add(s);
      steamVents.push({ mesh: s, x, z, speed });
    }
    steamGroupRef.current = steamGroup;
    cookGroup.add(steamGroup);

    // Akambalo Lid Group
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 1.8, 0);

    const lidConeGeo = new THREE.ConeGeometry(1.9, 0.9, 32);
    const lidConeMat = new THREE.MeshStandardMaterial({ color: 0xB08D57, roughness: 0.75 });
    const lidCone = new THREE.Mesh(lidConeGeo, lidConeMat);
    lidGroup.add(lidCone);

    const handleGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x734B21, roughness: 0.8 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0, 0.55, 0);
    lidGroup.add(handle);

    lidGroupRef.current = lidGroup;
    cookGroup.add(lidGroup);

    scene.add(cookGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const t = clock.getElapsedTime();
      const covered = isLidCoveredRef.current;

      if (lidGroupRef.current) {
        const targetY = covered ? 0.35 : 1.8;
        const targetRot = covered ? 0 : 0.3;
        lidGroupRef.current.position.y += (targetY - lidGroupRef.current.position.y) * 0.08;
        lidGroupRef.current.rotation.z += (targetRot - lidGroupRef.current.rotation.z) * 0.08;
      }

      if (steamGroupRef.current) {
        steamGroupRef.current.visible = !covered;
        if (!covered) {
          steamVents.forEach((sv) => {
            sv.mesh.position.y = 0.1 + ((sv.mesh.position.y + 0.012 * sv.speed) % 1.6);
            const scale = 0.03 + (sv.mesh.position.y / 1.6) * 0.07;
            sv.mesh.scale.set(scale, scale, scale);
          });
        }
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

  const handleDensityChange = (val: number) => {
    setPoreDensity(val);
    if (poresGroupRef.current) {
      const activeCount = Math.floor(poresGroupRef.current.children.length * (val / 100));
      poresGroupRef.current.children.forEach((child, i) => {
        child.visible = i < activeCount;
      });
    }
  };

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Lid & Ayn Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xs mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl flex flex-col gap-2.5 text-xs">
        <div className="flex items-center justify-between font-bold text-ethiopia-linen">
          <span className="text-ethiopia-teff-400">Eye Density (ዓይን)</span>
          <span className="font-mono text-ethiopia-clay-400">{poreDensity}%</span>
        </div>

        <input
          type="range"
          min="20"
          max="100"
          value={poreDensity}
          onChange={(e) => handleDensityChange(Number(e.target.value))}
          className="w-full accent-ethiopia-clay-500 cursor-pointer h-1.5 bg-ethiopia-earth-800 rounded-lg"
        />

        <button
          onClick={() => {
            setIsLidCovered(!isLidCovered);
            soundEngine.playSizzle && soundEngine.playSizzle();
          }}
          className={`w-full py-2 rounded-xl font-bold transition-all shadow-md ${
            isLidCovered
              ? 'bg-ethiopia-clay-500 text-ethiopia-linen'
              : 'bg-ethiopia-teff-500 text-ethiopia-obsidian'
          }`}
        >
          {isLidCovered ? '🔓 Lift Akambalo Lid' : '🔒 Cover with Akambalo Lid'}
        </button>
      </div>
    </div>
  );
}
