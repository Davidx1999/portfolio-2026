/**
 * animationLoop.js
 * ----------------
 * The continuous physics engine that drives the particle simulation.
 * Handles: pattern forces, vortex mouse interaction, parallax camera,
 * anticipation / bounce / pulse dynamics.
 *
 * ⚠️  The mathematical formulas inside are intentional – do not simplify.
 */

const CHLADNI_STRENGTH = 2.5;
const BASIN_RADIUS     = 50.0;
const PULSE_INTERVAL   = 7000; // ms between auto-pulses

/**
 * Start the animation.
 *
 * @param {object} world        – from createParticleSystem()
 * @param {object} mouse        – { state, update } from createMouseTracker()
 * @param {object} patternState – mutable object holding current pattern info
 * @param {Function} onPatternChange – callback(patIdx) when auto-pulse fires
 * @returns {{ stop: Function, triggerPulse: Function }}
 */
export default function startAnimation(world, mouse, patternState, onPatternChange) {
  const {
    scene, camera, renderer, geometry,
    positions, velocities, NUM_PARTICLES, material,
  } = world;

  // Smooth camera parallax accumulators
  let camSmoothX = 0;
  let camSmoothY = 0;

  let animId = null;

  // -------------------------------------------------------
  // Pulse – triggered on pattern change (auto or manual)
  // -------------------------------------------------------
  function triggerPulse(nextIdx) {
    const patterns = patternState.patterns;

    if (nextIdx !== undefined) {
      patternState.index = nextIdx;
    } else {
      patternState.index = (patternState.index + 1) % patterns.length;
    }

    const p = patterns[patternState.index];
    patternState.active   = p;
    patternState.targetA  = p.holeA;
    patternState.targetB  = p.holeB;
    patternState.targetK  = p.holeK;
    patternState.lastPulse = Date.now();
    patternState.autoPlay  = (nextIdx === undefined);

    // Explosive swirl on every particle
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const x = pos[i * 3];
      const y = pos[i * 3 + 1];
      const dist = Math.sqrt(x * x + y * y) || 1;

      const pushOut = (Math.random() * 5.0 + 2.0) * Math.max(0, 1.0 - (dist / 40));
      const swirl   = Math.sin(dist * 0.2) * 2.5 + (Math.random() - 0.5) * 3.0;

      velocities[i * 3]     += (x / dist) * pushOut - (y / dist) * swirl;
      velocities[i * 3 + 1] += (y / dist) * pushOut + (x / dist) * swirl;
      velocities[i * 3 + 2] += (Math.random() - 0.5) * pushOut * 3.0;
    }

    if (onPatternChange) onPatternChange(patternState.index);
  }

  // -------------------------------------------------------
  // Main loop
  // -------------------------------------------------------
  function animate() {
    animId = requestAnimationFrame(animate);

    // --- Camera parallax ---
    camSmoothX += (mouse.state.screenX - camSmoothX) * 0.05;
    camSmoothY += (mouse.state.screenY - camSmoothY) * 0.05;
    camera.position.x = camSmoothX * 3.0;
    camera.position.y = camSmoothY * 3.0;
    camera.position.z = 22;
    camera.lookAt(0, 0, 0);

    // --- Mouse smoothing ---
    mouse.update();
    const mouseX = mouse.state.x;
    const mouseY = mouse.state.y;
    const mouseVx = mouse.state.vx;
    const mouseVy = mouse.state.vy;

    // --- Timing ---
    const now = Date.now();
    const timeSincePulse = (now - patternState.lastPulse) / 1000;
    const toNext = (PULSE_INTERVAL - (now - patternState.lastPulse)) / 1000;

    if (patternState.autoPlay && toNext <= 0) triggerPulse();

    // --- Anticipation ---
    let anticipation = 0;
    if (toNext < 0.45 && patternState.autoPlay) {
      const t = 1.0 - (toNext / 0.45);
      anticipation = -Math.pow(t, 2) * 0.3;
    }

    // --- Bounce ---
    let bounce = 0;
    if (timeSincePulse < 2.5) {
      const t = timeSincePulse;
      bounce = Math.exp(-t * 4.5) * Math.sin(t * 16.0) * 1.2;
    }

    const masterScale   = 1.0 + anticipation + bounce;
    const activePattern = patternState.active;
    const isFilled      = activePattern.isFilled;

    // Opacity flash on pulse
    material.opacity = timeSincePulse < 0.6
      ? 0.55 + (0.6 - timeSincePulse) * 0.35
      : 0.55;

    // Friction: looser during explosion
    const currentFriction = timeSincePulse < 0.8 ? 0.985 : 0.94;

    // Smooth shape interpolation
    patternState.curA += (patternState.targetA - patternState.curA) * 0.08;
    patternState.curB += (patternState.targetB - patternState.curB) * 0.08;
    patternState.curK += (patternState.targetK - patternState.curK) * 0.08;

    const displayA = patternState.curA * masterScale;
    const displayB = patternState.curB * masterScale;
    const holePowA = Math.pow(displayA, patternState.curK);
    const holePowB = Math.pow(displayB, patternState.curK);
    const curK     = patternState.curK;

    // Mouse speed & direction
    const speed     = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy);
    const dirX      = speed > 0.001 ? mouseVx / speed : 0;
    const dirY      = speed > 0.001 ? mouseVy / speed : 0;
    const swirlForce = Math.min(speed * 20.0, 15.0);
    const wakeForce  = Math.min(speed * 30.0, 20.0);

    const posArray = geometry.attributes.position.array;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const x = posArray[i * 3];
      const y = posArray[i * 3 + 1];
      const z = posArray[i * 3 + 2];

      // --- Center shape (superellipse) ---
      const absX   = Math.abs(x);
      const absY   = Math.abs(y);
      const powX_K = Math.pow(absX, curK);
      const powY_K = Math.pow(absY, curK);

      const dSuper        = (powX_K / holePowA) + (powY_K / holePowB);
      const distNormalized = Math.pow(dSuper, 1.0 / curK);

      const gx   = (curK * Math.pow(absX, curK - 1) / holePowA) * Math.sign(x);
      const gy   = (curK * Math.pow(absY, curK - 1) / holePowB) * Math.sign(y);
      const gMag = Math.sqrt(gx * gx + gy * gy) || 1;
      const nx = gx / gMag;
      const ny = gy / gMag;
      const tx = -ny;
      const ty = nx;

      let shapeForceX = 0;
      let shapeForceY = 0;
      const distFromBorder = distNormalized - 1.0;

      if (distNormalized < 1.0) {
        if (!isFilled) {
          const push = -distFromBorder * 0.8;
          shapeForceX = nx * push;
          shapeForceY = ny * push;
        }
      } else {
        const pull = Math.min(distFromBorder, 0.8) * 0.35;
        shapeForceX = -nx * pull;
        shapeForceY = -ny * pull;
      }

      // Tangential diffusion / filled random spread
      const ringProximity = isFilled ? 0 : Math.max(0.0, 1.0 - Math.abs(distFromBorder) * 4.0);
      const randomSpread  = (Math.random() - 0.5) * 0.35;

      if (isFilled && distNormalized < 1.0) {
        shapeForceX += (Math.random() - 0.5) * 0.2;
        shapeForceY += (Math.random() - 0.5) * 0.2;
      } else {
        shapeForceX += tx * randomSpread * ringProximity;
        shapeForceY += ty * randomSpread * ringProximity;
      }

      // --- Outer grid (Chladni isolines) ---
      const h  = 0.1;
      const C0  = activePattern.C(x, y);
      const Cdx = (activePattern.C(x + h, y) - C0) / h;
      const Cdy = (activePattern.C(x, y + h) - C0) / h;

      const chladniForceX = -C0 * Cdx * CHLADNI_STRENGTH;
      const chladniForceY = -C0 * Cdy * CHLADNI_STRENGTH;

      const blend = Math.min(1.0, Math.max(0.0, (distNormalized - 1.25) / 0.35));

      velocities[i * 3]     += shapeForceX * (1.0 - blend) + chladniForceX * blend;
      velocities[i * 3 + 1] += shapeForceY * (1.0 - blend) + chladniForceY * blend;

      // Z gravity – pull back to plane
      velocities[i * 3 + 2] -= z * 0.08;

      // --- 3D Vortex mouse interaction ---
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dz = z;
      const distMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const vortexRadius = 2.0;

      if (distMouse < vortexRadius && speed > 0.001) {
        let falloff = 1.0 - (distMouse / vortexRadius);
        falloff = falloff * falloff;

        // Cross-product swirl
        let cx = dirY * dz;
        let cy = -dirX * dz;
        let cz = dirX * dy - dirY * dx;
        const cMag = Math.sqrt(cx * cx + cy * cy + cz * cz) || 1;
        cx /= cMag; cy /= cMag; cz /= cMag;

        velocities[i * 3]     += cx * falloff * swirlForce;
        velocities[i * 3 + 1] += cy * falloff * swirlForce;
        velocities[i * 3 + 2] += cz * falloff * swirlForce;

        // Wake current
        velocities[i * 3]     -= dirX * falloff * wakeForce;
        velocities[i * 3 + 1] -= dirY * falloff * wakeForce;
        velocities[i * 3 + 2] += (Math.random() - 0.5) * falloff * swirlForce * 0.5;

        // Suction
        const snx = dx / distMouse;
        const sny = dy / distMouse;
        const snz = dz / distMouse;
        velocities[i * 3]     -= snx * falloff * 2.0;
        velocities[i * 3 + 1] -= sny * falloff * 2.0;
        velocities[i * 3 + 2] -= snz * falloff * 2.0;
      }

      // Basin containment
      const distCenter = Math.sqrt(x * x + y * y);
      if (distCenter > BASIN_RADIUS) {
        const pull = (distCenter - BASIN_RADIUS) * 0.06;
        velocities[i * 3]     -= (x / distCenter) * pull;
        velocities[i * 3 + 1] -= (y / distCenter) * pull;
      }

      // Brownian noise
      velocities[i * 3]     += (Math.random() - 0.5) * 0.12;
      velocities[i * 3 + 1] += (Math.random() - 0.5) * 0.12;
      velocities[i * 3 + 2] += (Math.random() - 0.5) * 0.12;

      // Friction
      velocities[i * 3]     *= currentFriction;
      velocities[i * 3 + 1] *= currentFriction;
      velocities[i * 3 + 2] *= currentFriction;

      // Integrate
      posArray[i * 3]     += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];
    }

    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  function stop() {
    if (animId !== null) cancelAnimationFrame(animId);
  }

  return { animate, stop, triggerPulse };
}
