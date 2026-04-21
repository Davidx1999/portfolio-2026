/**
 * patterns.js
 * -----------
 * Each pattern defines:
 *   - name:     UI label
 *   - holeA/B:  superellipse semi-axes for center shape
 *   - holeK:    superellipse exponent
 *   - isFilled: if true particles fill the interior instead of forming a ring
 *   - C(x,y):   scalar field whose zero-crossings draw the outer grid
 *
 * ⚠️  DO NOT change the C() formulas – they drive the visual patterns.
 */

const PATTERNS = [
  {
    name: 'Solid Square',
    holeA: 18, holeB: 18, holeK: 8,
    isFilled: true,
    C: (x, y) => 0,
  },
  {
    name: 'Grid of Circles',
    holeA: 0.5, holeB: 0.5, holeK: 0.5,
    isFilled: false,
    C: (x, y) => Math.cos(x * 0.09) * Math.cos(y * 0.15) - 0.015,
  },
  {
    name: 'Diamond Eyes',
    holeA: 12, holeB: 12, holeK: 2.5,
    isFilled: false,
    C: (x, y) => {
      let shape = Math.sqrt(Math.abs(x * 0.1)) + Math.sqrt(Math.abs(y * 0.1)) - 2.5;
      let eye1 = Math.sqrt(Math.pow(x - 4, 2) + Math.pow(y, 2)) - 0.8;
      let eye2 = Math.sqrt(Math.pow(x + 4, 2) + Math.pow(y, 2)) - 0.8;
      return Math.min(shape, eye1, eye2);
    },
  },
  {
    name: 'Concentric Circles',
    holeA: 11, holeB: 11, holeK: 2,
    isFilled: false,
    C: (x, y) => {
      let distance = Math.sqrt(x * x + y * y);
      return Math.cos(distance * 0.3);
    },
  },
  {
    name: 'Hexagon Matrix',
    holeA: 16, holeB: 16, holeK: 4,
    isFilled: false,
    C: (x, y) =>
      Math.cos(x * 0.25) +
      Math.cos(x * 0.125 + y * 0.216) +
      Math.cos(x * 0.125 - y * 0.216) - 1.0,
  },
  {
    name: 'Supernova',
    holeA: 12, holeB: 12, holeK: 1.5,
    isFilled: false,
    C: (x, y) =>
      Math.sqrt(Math.abs(x * 0.3)) + Math.sqrt(Math.abs(y * 0.3)) - 1.5,
  },
  {
    name: 'Infinity Waves',
    holeA: 20, holeB: 10, holeK: 2,
    isFilled: false,
    C: (x, y) => Math.sin(x * 0.2) * Math.cos(y * 0.4) - 0.2,
  },
];

export default PATTERNS;
