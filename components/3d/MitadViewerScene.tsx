'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function MitadViewerScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHeated, setIsHeated] = useState(true);
  const [isSeasoned, setIsSeasoned] = useState(true);
  const [testWater, setTestWater] = useState(false);

  const plateMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const waterGroupRef = useRef<THREE.Group | null>(null);
  const heatLightRef = useRef<THREE.PointLight | null>(null);
  const isHeatedRef = useRef(true);

  useEffect(() => {
    isHeatedRef.current = isHeated;
  }, [isHeated]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.2, 4.6);

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
    scene.add(new THREE.AmbientLight(0xFFF5EA, 0.7));
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.4);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const heatLight = new THREE.PointLight(0xFF6622, 2.0, 4);
    heatLight.position.set(0, -0.2, 0);
    heatLightRef.current = heatLight;
    scene.add(heatLight);

    const mitadGroup = new THREE.Group();
    mitadGroup.position.set(0, -0.4, 0);

    // Outer Rim Housing
    const rimGeo = new THREE.CylinderGeometry(2.1, 2.2, 0.35, 48);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x2B1D16, roughness: 0.8 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.set(0, -0.15, 0);
    mitadGroup.add(rimMesh);

    // Terracotta Baking Slab
    const plateGeo = new THREE.CylinderGeometry(1.95, 1.95, 0.1, 48);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x3D2A1E,
      roughness: 0.4,
      metalness: 0.15,
    });
    plateMatRef.current = plateMat;
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.set(0, 0.05, 0);
    mitadGroup.add(plateMesh);

    // Base Stand
    const standGeo = new THREE.CylinderGeometry(1.8, 1.9, 0.2, 32);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1C1410, roughness: 0.9 });
    const standMesh = new THREE.Mesh(standGeo, standMat);
    standMesh.position.set(0, -0.4, 0);
    mitadGroup.add(standMesh);

    // Water droplets group
    const waterGroup = new THREE.Group();
    waterGroup.position.set(0, 0.15, 0);
    const dropGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const dropMat = new THREE.MeshStandardMaterial({ color: 0xEBF7FF, roughness: 0.1 });
    const dropData: { mesh: THREE.Mesh; x: number; z: number }[] = [];

    for (let i = 0; i < 15; i++) {
      const drop = new THREE.Mesh(dropGeo, dropMat);
      const x = (Math.random() - 0.5) * 1.5;
      const z = (Math.random() - 0.5) * 1.5;
      drop.position.set(x, 0.02, z);
      waterGroup.add(drop);
      dropData.push({ mesh: drop, x, z });
    }
    waterGroup.visible = false;
    waterGroupRef.current = waterGroup;
    mitadGroup.add(waterGroup);

    scene.add(mitadGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const t = clock.getElapsedTime();
      const heated = isHeatedRef.current;

      if (plateMatRef.current) {
        if (heated) {
          plateMatRef.current.emissive = new THREE.Color(0x3a1005);
          plateMatRef.current.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.15;
          if (heatLightRef.current) heatLightRef.current.intensity = 1.8 + Math.sin(t * 3) * 0.4;
        } else {
          plateMatRef.current.emissiveIntensity = 0;
          if (heatLightRef.current) heatLightRef.current.intensity = 0.1;
        }
      }

      if (waterGroupRef.current && waterGroupRef.current.visible) {
        dropData.forEach((d) => {
          d.mesh.position.y = 0.02 + Math.abs(Math.sin(t * 8 + d.x * 5)) * 0.05;
        });
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

  const handleWaterTest = () => {
    setTestWater(true);
    if (waterGroupRef.current) waterGroupRef.current.visible = true;
    soundEngine.playSizzle && soundEngine.playSizzle();
    setTimeout(() => {
      setTestWater(false);
      if (waterGroupRef.current) waterGroupRef.current.visible = false;
    }, 2200);
  };

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Mitad Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-sm mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3 backdrop-blur-xl shadow-2xl flex flex-wrap gap-2 justify-center text-xs">
        <button
          onClick={() => {
            setIsHeated(!isHeated);
            soundEngine.playTizitaChime && soundEngine.playTizitaChime(isHeated ? 0 : 2);
          }}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            isHeated
              ? 'bg-ethiopia-clay-500 text-ethiopia-linen shadow-md'
              : 'bg-ethiopia-earth-800 text-ethiopia-earth-300'
          }`}
        >
          {isHeated ? '🔥 Heat ON (~200°C)' : '❄️ Heat OFF'}
        </button>

        <button
          onClick={() => {
            setIsSeasoned(!isSeasoned);
            if (plateMatRef.current) {
              plateMatRef.current.color.setHex(!isSeasoned ? 0x3D2A1E : 0x6E432B);
              plateMatRef.current.roughness = !isSeasoned ? 0.4 : 0.9;
            }
            soundEngine.playTizitaChime && soundEngine.playTizitaChime(1);
          }}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            isSeasoned
              ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian shadow-md'
              : 'bg-ethiopia-earth-800 text-ethiopia-earth-300'
          }`}
        >
          {isSeasoned ? '✨ Gomenzer Seasoned' : 'Unseasoned'}
        </button>

        <button
          onClick={handleWaterTest}
          disabled={testWater}
          className="w-full py-1.5 rounded-lg bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 text-ethiopia-teff-300 font-semibold border border-ethiopia-teff-500/30 transition-colors flex items-center justify-center gap-1"
        >
          <span>💧 Test Heat (Leidenfrost Water Drop Test)</span>
        </button>
      </div>
    </div>
  );
}
