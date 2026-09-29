import sharp from 'sharp';
import fs from 'fs';

async function check() {
  const f1 = await sharp('./src/assets/ezgif-140247ce3ceb2550-jpg/ezgif-frame-001.jpg').raw().toBuffer({ resolveWithObject: true });
  const f240 = await sharp('./src/assets/ezgif-140247ce3ceb2550-jpg/ezgif-frame-240.jpg').raw().toBuffer({ resolveWithObject: true });
  
  console.log('Frame 1 width x height:', f1.info.width, f1.info.height);
  const samplePoints = [
    [0, 0],
    [500, 50],
    [1800, 50],
    [50, 1000],
    [1800, 1000]
  ];
  
  console.log('Frame 1 sample points:');
  samplePoints.forEach(([x, y]) => {
    const idx = (y * f1.info.width + x) * 3;
    console.log(`(${x}, ${y}) -> R:${f1.data[idx]}, G:${f1.data[idx+1]}, B:${f1.data[idx+2]}`);
  });

  console.log('Frame 240 sample points:');
  samplePoints.forEach(([x, y]) => {
    const idx = (y * f240.info.width + x) * 3;
    console.log(`(${x}, ${y}) -> R:${f240.data[idx]}, G:${f240.data[idx+1]}, B:${f240.data[idx+2]}`);
  });
}

check();
