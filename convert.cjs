const ffmpeg = require('ffmpeg-static');
const { spawnSync } = require('child_process');
const path = require('path');

const inputFile = path.join(__dirname, 'public/assets/videos/whatIdo.mov');
const outputFile = path.join(__dirname, 'public/assets/videos/whatIdo_keyframes.mp4');

console.log('Using ffmpeg path:', ffmpeg);
console.log('Encoding video...');

const result = spawnSync(ffmpeg, [
  '-y', // overwrite output
  '-i', inputFile,
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-profile:v', 'main',
  '-tune', 'fastdecode',
  '-bf', '0',
  '-g', '1',
  '-keyint_min', '1',
  '-an', // remove audio
  outputFile
], { stdio: 'inherit' });

if (result.error) {
  console.error('Error running ffmpeg:', result.error);
  process.exit(1);
}

if (result.status !== 0) {
  console.error('ffmpeg failed with exit code:', result.status);
  process.exit(result.status);
}

console.log('Video encoded successfully!');
