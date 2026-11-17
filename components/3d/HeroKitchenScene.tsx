'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function HeroKitchenScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0E0C0A, 0);

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 7.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minPolarAngle = Math.PI / 6;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xFFE8D6, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFF2DF, 1.5);
    dirLight.position.set(4, 6, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const hearthLight = new THREE.PointLight(0xFF6F3C, 2.2, 5);
    hearthLight.position.set(0, -0.2, 0);
    scene.add(hearthLight);

    const goldFillLight = new THREE.PointLight(0xC59334, 0.9, 7);
    goldFillLight.position.set(-3, 2, -2);
    scene.add(goldFillLight);

    // 3. Mitad Group
    const mitadGroup = new THREE.Group();
    mitadGroup.position.set(0, -0.4, 0);

    // Heavy Clay Base
    const baseGeo = new THREE.CylinderGeometry(2.2, 2.35, 0.3, 48);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x2B1810, roughness: 0.9 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -0.15, 0);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    mitadGroup.add(baseMesh);

    // Seasoned Baking Surface
    const plateGeo = new THREE.CylinderGeometry(2.05, 2.05, 0.08, 48);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x382A22, roughness: 0.7, metalness: 0.15 });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.set(0, 0.02, 0);
    plateMesh.receiveShadow = true;
    mitadGroup.add(plateMesh);

    // Honeycomb Injera on Top
    const injeraGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.04, 48);
    const injeraMat = new THREE.MeshStandardMaterial({ color: 0xCDB38B, roughness: 0.95 });
    const injeraMesh = new THREE.Mesh(injeraGeo, injeraMat);
    injeraMesh.position.set(0, 0.07, 0);
    injeraMesh.receiveShadow = true;
    mitadGroup.add(injeraMesh);

    // Terracotta Rim Accent
    const rimGeo = new THREE.TorusGeometry(2.08, 0.06, 16, 48);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.set(0, 0.04, 0);
    mitadGroup.add(rimMesh);

    scene.add(mitadGroup);

    // 4. Traditional Clay Jars in Background
    const createClayJar = (x: number, y: number, z: number, color: number) => {
      const jarGroup = new THREE.Group();
      jarGroup.position.set(x, y, z);

      const bellyGeo = new THREE.SphereGeometry(0.5, 24, 24);
      const bellyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.85 });
      const belly = new THREE.Mesh(bellyGeo, bellyMat);
      belly.position.set(0, 0.4, 0);
      belly.castShadow = true;
      jarGroup.add(belly);

      const neckGeo = new THREE.CylinderGeometry(0.22, 0.28, 0.4, 24);
      const neck = new THREE.Mesh(neckGeo, bellyMat);
      neck.position.set(0, 0.8, 0);
      jarGroup.add(neck);

      const lipGeo = new THREE.TorusGeometry(0.24, 0.05, 12, 24);
      const lip = new THREE.Mesh(lipGeo, bellyMat);
      lip.rotation.x = Math.PI / 2;
      lip.position.set(0, 1.0, 0);
      jarGroup.add(lip);

      return jarGroup;
    };

    const jar1 = createClayJar(2.3, -0.4, -0.8, 0x8A4325);
    const jar2 = createClayJar(-2.4, -0.4, -0.6, 0x73351C);
    scene.add(jar1);
    scene.add(jar2);

    // 5. Rising Steam Particle Simulation
    const steamCount = 45;
    const steamGeo = new THREE.SphereGeometry(1, 8, 8);
    const steamMat = new THREE.MeshBasicMaterial({ color: 0xE8DFD8, transparent: true, opacity: 0.22, depthWrite: false });
    const steamParticles: { mesh: THREE.Mesh; speed: number; phase: number; radius: number; angle: number }[] = [];

    for (let i = 0; i < steamCount; i++) {
      const pMesh = new THREE.Mesh(steamGeo, steamMat);
      const radius = Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.25 + Math.random() * 0.45;
      const phase = Math.random() * Math.PI * 2;

      pMesh.position.set(Math.cos(angle) * radius, 0.1 + Math.random() * 2, Math.sin(angle) * radius);
      scene.add(pMesh);
      steamParticles.push({ mesh: pMesh, speed, phase, radius, angle });
    }

    // 6. Floating Golden Teff Grains
    const grainCount = 65;
    const grainGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const grainMat = new THREE.MeshStandardMaterial({ color: 0xC59334, roughness: 0.4, metalness: 0.2 });
    const grainMeshes: { mesh: THREE.Mesh; basePos: THREE.Vector3; rotSpeed: THREE.Vector3 }[] = [];

    for (let i = 0; i < grainCount; i++) {
      const gMesh = new THREE.Mesh(grainGeo, grainMat);
      const basePos = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        -0.8 + Math.random() * 4.5,
        (Math.random() - 0.5) * 8
      );
      gMesh.position.copy(basePos);
      gMesh.scale.set(1, 1.5, 1);
      scene.add(gMesh);
      grainMeshes.push({
        mesh: gMesh,
        basePos,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04
        ),
      });
    }

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Controls update
      controls.update();

      // Pulse hearth light
      hearthLight.intensity = 2.0 + Math.sin(elapsedTime * 2.5) * 0.4;

      // Animate Steam
      steamParticles.forEach((sp) => {
        sp.mesh.position.y = 0.1 + ((sp.mesh.position.y + 0.012 * sp.speed) % 2.2);
        sp.mesh.position.x = Math.cos(sp.angle) * sp.radius + Math.sin(elapsedTime * 1.5 + sp.phase) * 0.12;
        const scale = 0.03 + (sp.mesh.position.y / 2.2) * 0.08;
        sp.mesh.scale.set(scale, scale, scale);
      });

      // Animate Teff Grains
      grainMeshes.forEach((gm, idx) => {
        gm.mesh.position.y = gm.basePos.y + Math.sin(elapsedTime * 0.6 + idx) * 0.25;
        gm.mesh.position.x = gm.basePos.x + Math.cos(elapsedTime * 0.5 + idx) * 0.2;
        gm.mesh.rotation.x += gm.rotSpeed.x;
        gm.mesh.rotation.y += gm.rotSpeed.y;
      });

      // Jar gentle float
      jar1.position.y = -0.4 + Math.sin(elapsedTime * 0.8) * 0.04;
      jar2.position.y = -0.4 + Math.cos(elapsedTime * 0.8) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
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
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing" />
  );
}
