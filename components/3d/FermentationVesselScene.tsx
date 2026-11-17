'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function FermentationVesselScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState<number>(3);

  const ayrMeshRef = useRef<THREE.Mesh | null>(null);
  const batterMeshRef = useRef<THREE.Mesh | null>(null);
  const batterMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const bubblesGroupRef = useRef<THREE.Group | null>(null);
  const dayRef = useRef(3);

  useEffect(() => {
    dayRef.current = day;
  }, [day]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 4.2);

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
    const dirLight = new THREE.DirectionalLight(0xFFF5EA, 1.4);
    dirLight.position.set(4, 5, 4);
    scene.add(dirLight);

    const vesselGroup = new THREE.Group();
    vesselGroup.position.set(0, -0.3, 0);

    // Clay Pot Wall (Cutaway)
    const potGeo = new THREE.CylinderGeometry(0.9, 0.75, 1.4, 32, 1, true);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x7E3F24, roughness: 0.7, side: THREE.DoubleSide });
    const pot = new THREE.Mesh(potGeo, potMat);
    vesselGroup.add(pot);

    const baseGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.08, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x6B321B, roughness: 0.9 });
    const potBase = new THREE.Mesh(baseGeo, baseMat);
    potBase.position.set(0, -0.7, 0);
    vesselGroup.add(potBase);

    // Fermenting Batter
    const batterGeo = new THREE.CylinderGeometry(0.82, 0.72, 1.0, 32);
    const batterMat = new THREE.MeshStandardMaterial({ color: 0xBF9E6A, roughness: 0.8 });
    batterMatRef.current = batterMat;
    const batter = new THREE.Mesh(batterGeo, batterMat);
    batter.position.set(0, -0.15, 0);
    batterMeshRef.current = batter;
    vesselGroup.add(batter);

    // Ayr (Yellow surface liquid layer)
    const ayrGeo = new THREE.CylinderGeometry(0.84, 0.83, 0.08, 32);
    const ayrMat = new THREE.MeshStandardMaterial({ color: 0xD4A338, transparent: true, opacity: 0.75, roughness: 0.2 });
    const ayr = new THREE.Mesh(ayrGeo, ayrMat);
    ayr.position.set(0, 0.38, 0);
    ayrMeshRef.current = ayr;
    vesselGroup.add(ayr);

    // Rising Bubbles Group
    const bubblesGroup = new THREE.Group();
    const bubbleGeo = new THREE.SphereGeometry(1, 12, 12);
    const bubbleMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.65, roughness: 0.1 });
    const bubbleData: { mesh: THREE.Mesh; x: number; z: number; speed: number; offset: number; size: number }[] = [];

    for (let i = 0; i < 50; i++) {
      const bMesh = new THREE.Mesh(bubbleGeo, bubbleMat);
      const size = 0.02 + Math.random() * 0.04;
      bMesh.scale.set(size, size, size);
      const x = (Math.random() - 0.5) * 0.9;
      const z = (Math.random() - 0.5) * 0.9;
      const speed = 0.3 + Math.random() * 0.5;
      const offset = Math.random() * Math.PI * 2;
      bMesh.position.set(x, -0.3, z);
      bubblesGroup.add(bMesh);
      bubbleData.push({ mesh: bMesh, x, z, speed, offset, size });
    }

    bubblesGroupRef.current = bubblesGroup;
    vesselGroup.add(bubblesGroup);

    scene.add(vesselGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      const t = clock.getElapsedTime();
      const currentDay = dayRef.current;
      const activeBubbleCount = currentDay === 1 ? 8 : currentDay === 2 ? 22 : currentDay === 3 ? 50 : 35;

      bubbleData.forEach((b, idx) => {
        b.mesh.visible = idx < activeBubbleCount;
        if (b.mesh.visible) {
          b.mesh.position.y = -0.3 + ((t * b.speed + b.offset) % 0.85);
          b.mesh.position.x = b.x + Math.sin(t * 2 + b.offset) * 0.03;
          b.mesh.position.z = b.z + Math.cos(t * 2 + b.offset) * 0.03;
        }
      });

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

  const handleSelectDay = (d: number) => {
    setDay(d);
    if (ayrMeshRef.current) {
      ayrMeshRef.current.visible = d >= 3;
    }
    if (batterMatRef.current) {
      const colorHex = d === 1 ? 0xD5C4A1 : d === 2 ? 0xCBB48B : d === 3 ? 0xBF9E6A : 0xB3915C;
      batterMatRef.current.color.setHex(colorHex);
    }
    soundEngine.playBubble && soundEngine.playBubble();
  };

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 4-Day Timeline Scrubber */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-sm mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl text-xs">
        <div className="flex items-center justify-between font-bold text-ethiopia-linen mb-2">
          <span className="text-ethiopia-teff-400">Fermentation Timeline</span>
          <span className="bg-ethiopia-clay-500/30 text-ethiopia-clay-300 px-2 py-0.5 rounded-full font-mono text-[11px]">
            Day {day} of 4
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[1, 2, 3, 4].map((d) => (
            <button
              key={d}
              onClick={() => handleSelectDay(d)}
              className={`py-1.5 rounded-lg text-center font-bold transition-all ${
                day === d
                  ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian shadow-md scale-105'
                  : 'bg-ethiopia-earth-800 text-ethiopia-earth-300 hover:bg-ethiopia-earth-700'
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-ethiopia-earth-200 leading-tight bg-ethiopia-earth-900/80 p-2 rounded-lg border border-ethiopia-earth-700/50">
          {day === 1 && 'Day 1: Inoculation with ersho. Lactic acid bacteria awake and begin dropping pH.'}
          {day === 2 && 'Day 2: Active microbial expansion. Gas bubbles form as wild yeasts ferment sugars.'}
          {day === 3 && 'Day 3: Peak aroma. Yellow "Ayr" liquid separates on top with sour residues.'}
          {day === 4 && 'Day 4: Mature sourdough slurry ready for decanting and Absit gelatinization.'}
        </p>
      </div>
    </div>
  );
}
