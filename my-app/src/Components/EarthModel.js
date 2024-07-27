import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import earth from '../Pages/img/satellite-image-maps-and-posters-printable-satellite-maps-1.jpg';
import '../Pages/css/Earth.css';

const Earth = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const radius = 30;
    const geometry = new THREE.SphereGeometry(radius, 60, 62);
    
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(earth);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 84;
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="earth-canvas" style={{width: "300px", height: "280px"}} />;
};

export default Earth;