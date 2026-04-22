import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScroll, useTransform } from 'framer-motion';

const NUM_CORE = 40000;
const NUM_DISK = 80000;
const NUM_TOTAL = NUM_CORE + NUM_DISK;

export function BackgroundParticles() {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll();
  
  // 0.0 to 2.0 morph progress (Saturn -> Galaxy -> Deep Space)
  const morphProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Neutral background, actual color is in the wrapper
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 4, 35);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Attributes ---
    const geometry = new THREE.BufferGeometry();
    
    const posSaturn = new Float32Array(NUM_TOTAL * 3);
    const posGalaxy = new Float32Array(NUM_TOTAL * 3);
    const posSpace = new Float32Array(NUM_TOTAL * 3);
    
    const sizes = new Float32Array(NUM_TOTAL);
    const shift = new Float32Array(NUM_TOTAL * 4);

    for (let i = 0; i < NUM_TOTAL; i++) {
      const idx = i * 3;
      const sidx = i * 4;

      // 1. Saturn Shape (Adapted to 120k)
      const p = i / NUM_TOTAL;
      if (p < 0.3) { // Planet
        const phi = Math.acos(-1 + (2 * i) / (NUM_TOTAL * 0.3));
        const theta = Math.sqrt(NUM_TOTAL * 0.3 * Math.PI) * phi;
        const r = 8 + Math.random() * 0.3;
        posSaturn[idx] = r * Math.cos(theta) * Math.sin(phi);
        posSaturn[idx+1] = r * Math.sin(theta) * Math.sin(phi);
        posSaturn[idx+2] = r * Math.cos(phi);
      } else { // Rings
        const angle = Math.random() * Math.PI * 2;
        const r = 12 + Math.random() * 10;
        const thickness = (Math.random() - 0.5) * 0.5;
        posSaturn[idx] = r * Math.cos(angle);
        posSaturn[idx+1] = thickness;
        posSaturn[idx+2] = r * Math.sin(angle);
      }

      // 2. Galaxy Shape (Based on user-provided logic)
      if (i < NUM_CORE) {
        // Sphere core
        const v = new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
        posGalaxy[idx] = v.x;
        posGalaxy[idx+1] = v.y;
        posGalaxy[idx+2] = v.z;
      } else {
        // Disk
        let r = 10, R = 40;
        let rand = Math.pow(Math.random(), 1.5);
        let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
        const angle = Math.random() * 2 * Math.PI;
        const height = (Math.random() - 0.5) * 2;
        posGalaxy[idx] = radius * Math.cos(angle);
        posGalaxy[idx+1] = height;
        posGalaxy[idx+2] = radius * Math.sin(angle);
      }

      // 3. Deep Space
      const sphereR = 80 + Math.random() * 100;
      const sPhi = Math.random() * Math.PI * 2;
      const sTheta = Math.random() * Math.PI;
      posSpace[idx] = sphereR * Math.cos(sPhi) * Math.sin(sTheta);
      posSpace[idx+1] = sphereR * Math.sin(sPhi) * Math.sin(sTheta);
      posSpace[idx+2] = sphereR * Math.cos(sTheta);

      // Attributes
      sizes[i] = Math.random() * 1.5 + 0.5;
      shift[sidx] = Math.random() * Math.PI;
      shift[sidx+1] = Math.random() * Math.PI * 2;
      shift[sidx+2] = (Math.random() * 0.9 + 0.1) * Math.PI * 0.1;
      shift[sidx+3] = Math.random() * 0.9 + 0.1;
    }

    geometry.setAttribute('posSaturn', new THREE.BufferAttribute(posSaturn, 3));
    geometry.setAttribute('posGalaxy', new THREE.BufferAttribute(posGalaxy, 3));
    geometry.setAttribute('posSpace', new THREE.BufferAttribute(posSpace, 3));
    geometry.setAttribute('sizes', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('shift', new THREE.BufferAttribute(shift, 4));

    // --- Shader ---
    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector3() }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        uniform float uTime;
        uniform float uMorph;
        uniform vec3 uMouse;
        
        attribute float sizes;
        attribute vec4 shift;
        attribute vec3 posSaturn;
        attribute vec3 posGalaxy;
        attribute vec3 posSpace;
        
        varying vec3 vColor;

        void main() {
          vec3 targetPos;
          if (uMorph < 1.0) {
            targetPos = mix(posSaturn, posGalaxy, uMorph);
          } else {
            targetPos = mix(posGalaxy, posSpace, uMorph - 1.0);
          }

          float t = uTime;
          float moveT = mod(shift.x + shift.z * t, 6.283185);
          float moveS = mod(shift.y + shift.z * t, 6.283185);
          vec3 vibration = vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.a;
          
          vec3 finalPos = targetPos + vibration;

          // Mouse interaction
          float mouseDist = distance(finalPos, uMouse);
          if (mouseDist < 12.0) {
            vec3 dir = normalize(finalPos - uMouse);
            float force = (12.0 - mouseDist) / 12.0;
            finalPos += dir * force * 4.0;
          }

          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_PointSize = sizes * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          // User-provided grayscale color mix (brightened for visibility)
          float d = length(abs(finalPos) / vec3(45., 15., 45.));
          d = clamp(d, 0., 1.0);
          vColor = mix(vec3(255., 255., 255.), vec3(120., 120., 120.), d) / 255.0;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord.xy - 0.5);
          if (d > 0.5) discard;
          // Soft circular point with custom alpha
          gl_FragColor = vec4(vColor, smoothstep(0.5, 0.2, d) * 0.8);
        }
      `
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.order = "ZYX";
    particles.rotation.z = 0.2;
    
    // Position slightly to the right, but not off-screen
    particles.position.x = 12; 
    
    scene.add(particles);

    // --- Interaction ---
    const mouse = new THREE.Vector3(-999, -999, 0);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const onMouseMove = (e) => {
      mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);
      raycaster.ray.intersectPlane(plane, mouse);
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Animation Loop ---
    let frameId;
    const clock = new THREE.Clock();
    let baseRot = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime() * 0.5;
      uniforms.uTime.value = elapsedTime * Math.PI;
      uniforms.uMorph.value = morphProgress.get();
      uniforms.uMouse.value.lerp(mouse, 0.1);

      // Global Parallax
      baseRot += 0.0005;
      const targetRX = (0.3 - morphProgress.get() * 0.2) + (mouseVec.y * 0.1);
      const targetRY = baseRot + (mouseVec.x * 0.1);
      
      particles.rotation.x += (targetRX - particles.rotation.x) * 0.05;
      particles.rotation.y += (targetRY - particles.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 pointer-events-none -z-10 bg-[#0a0a0a]" 
      />
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 60% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)'
        }}
      />
    </>
  );
}
