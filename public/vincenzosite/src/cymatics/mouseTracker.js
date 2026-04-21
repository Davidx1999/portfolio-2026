/**
 * mouseTracker.js
 * ---------------
 * Tracks mouse position in world-space using a raycaster against the Z=0 plane.
 * Exposes smoothed position, velocity, and normalized screen coords (for parallax).
 */
import * as THREE from 'three';

export default function createMouseTracker(camera) {
  const raycaster = new THREE.Raycaster();
  const plane     = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouseVec  = new THREE.Vector2();
  const DELAY     = 0.2;

  const state = {
    // Smoothed world position
    x: 0,
    y: 0,
    // Target (raw) world position
    targetX: 0,
    targetY: 0,
    // Previous frame (for velocity)
    lastX: 0,
    lastY: 0,
    // Velocity this frame
    vx: 0,
    vy: 0,
    // Normalized screen coords (-1 … 1)
    screenX: 0,
    screenY: 0,
  };

  function onMouseMove(e) {
    mouseVec.x = (e.clientX / window.innerWidth)  *  2 - 1;
    mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;

    state.screenX = mouseVec.x;
    state.screenY = mouseVec.y;

    raycaster.setFromCamera(mouseVec, camera);
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, target);

    state.targetX = target.x;
    state.targetY = target.y;
  }

  window.addEventListener('mousemove', onMouseMove);

  /** Call once per frame to advance smoothing */
  function update() {
    state.x += (state.targetX - state.x) * DELAY;
    state.y += (state.targetY - state.y) * DELAY;
    state.vx = state.x - state.lastX;
    state.vy = state.y - state.lastY;
    state.lastX = state.x;
    state.lastY = state.y;
  }

  function dispose() {
    window.removeEventListener('mousemove', onMouseMove);
  }

  return { state, update, dispose };
}
