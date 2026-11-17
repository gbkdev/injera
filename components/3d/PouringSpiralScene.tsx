'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundEngine } from '@/lib/audio/soundfx';

export function PouringSpiralScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [pourProgress, setPourProgress] = useState(0.8);

  const expandingDiscRef = useRef<THREE.Mesh | null>(null);
  const isPlayingRef = useRef(true);
  const progressRef = useRef(0.8);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.5, 4.5);

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
    dirLight.position.set(3, 6, 4);
    scene.add(dirLight);

    const pourGroup = new THREE.Group();
    pourGroup.position.set(0, -0.3, 0);

    // Clay Mitad Base
    const mitadGeo = new THREE.CylinderGeometry(2.0, 2.1, 0.2, 48);
    const mitadMat = new THREE.MeshStandardMaterial({ color: 0x2E1C14, roughness: 0.85 });
    const mitad = new THREE.Mesh(mitadGeo, mitadMat);
    mitad.position.set(0, -0.05, 0);
    pourGroup.add(mitad);

    const plateGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.02, 48);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x3A241A, roughness: 0.6 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.set(0, 0.05, 0);
    pourGroup.add(plate);

    // Expanding Spiral Tube Geometry
    const points: THREE.Vector3[] = [];
    const turns = 3.5;
    const numPoints = 120;
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const angle = t * turns * Math.PI * 2;
      const radius = 1.7 * (1 - t * 0.9);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.05 + Math.sin(t * Math.PI) * 0.02;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.12, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({ color: 0xD8C29D, roughness: 0.4 });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    tube.position.set(0, 0.03, 0);
    pourGroup.add(tube);

    // Expanding Injera Disc
    const discGeo = new THREE.CylinderGeometry(1.75, 1.75, 0.02, 48);
    const discMat = new THREE.MeshStandardMaterial({ color: 0xCDB38B, roughness: 0.65, transparent: true, opacity: 0.85 });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.set(0, 0.06, 0);
    expandingDiscRef.current = disc;
    pourGroup.add(disc);

    scene.add(pourGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      controls.update();

      if (isPlayingRef.current) {
        progressRef.current += delta * 0.4;
        if (progressRef.current >= 1.0) {
          progressRef.current = 0.1;
        }
        setPourProgress(progressRef.current);
      }

      if (expandingDiscRef.current) {
        const scaleVal = Math.min(1, progressRef.current + 0.2);
        expandingDiscRef.current.scale.set(scaleVal, 1, scaleVal);
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

      {/* Interactive Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xs mx-auto bg-ethiopia-obsidian/95 border border-ethiopia-teff-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl flex flex-col gap-2.5 text-xs">
        <div className="flex items-center justify-between font-bold text-ethiopia-linen">
          <span className="text-ethiopia-teff-400">Spiral Pour Velocity</span>
          <span className="font-mono text-ethiopia-clay-400">{Math.round(pourProgress * 100)}%</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying) soundEngine.playPour && soundEngine.playPour();
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              isPlaying
                ? 'bg-ethiopia-teff-500 text-ethiopia-obsidian'
                : 'bg-ethiopia-earth-800 text-ethiopia-earth-300'
            }`}
          >
            {isPlaying ? '⏸️ Pause Flow' : '▶️ Animate Pour'}
          </button>
          <button
            onClick={() => {
              progressRef.current = 0.1;
              setPourProgress(0.1);
              soundEngine.playSizzle && soundEngine.playSizzle();
            }}
            className="px-3 py-1.5 rounded-lg bg-ethiopia-earth-800 hover:bg-ethiopia-earth-700 text-ethiopia-teff-300 font-semibold"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
