'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

export type Vr360ViewerProps = {
  imageUrl: string;
  caption?: string;
};

/** Equirectangular 360 viewer — desktop orbit + Quest WebXR via VRButton. */
export function Vr360Viewer({ imageUrl, caption }: Vr360ViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const vrHostRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const vrHost = vrHostRef.current;
    if (!mount || !vrHost) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 2000);
    camera.position.set(0, 0, 0.01);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, Math.max(mount.clientHeight, 320));
    renderer.xr.enabled = true;
    if ('outputColorSpace' in renderer) {
      (renderer as THREE.WebGLRenderer & { outputColorSpace: string }).outputColorSpace = THREE.SRGBColorSpace;
    }

    mount.appendChild(renderer.domElement);

    const vrBtn = VRButton.createButton(renderer);
    Object.assign(vrBtn.style, {
      position: 'absolute',
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '10',
    });
    vrHost.appendChild(vrBtn);

    const geometry = new THREE.SphereGeometry(500, 64, 32);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      imageUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        material.map = tex;
        material.needsUpdate = true;
        setError(null);
      },
      undefined,
      () => setError('Could not load panorama. Upload to GCS or check the URL.')
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.minDistance = 0.01;
    controls.maxDistance = 2;
    controls.rotateSpeed = -0.4;
    controls.target.set(0, 0, 0);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = Math.max(mount.clientHeight, 320);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      if (material.map) material.map.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      if (vrBtn.parentNode === vrHost) vrHost.removeChild(vrBtn);
    };
  }, [imageUrl]);

  return (
    <div style={{ position: 'relative', width: '100%', background: '#080808' }}>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: 'min(85vh, 100vw)',
          minHeight: 320,
          position: 'relative',
        }}
      />
      <div ref={vrHostRef} style={{ position: 'relative', minHeight: 56 }} />
      {error && (
        <p style={{ color: '#e8a0a0', textAlign: 'center', padding: '0.75rem 1rem', fontSize: '0.85rem' }}>{error}</p>
      )}
      {caption && (
        <p style={{ color: 'rgba(240,235,224,0.45)', textAlign: 'center', fontSize: '0.75rem', padding: '0.5rem 1rem 1rem' }}>
          {caption}
        </p>
      )}
    </div>
  );
}
