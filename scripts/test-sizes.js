import sharp from 'sharp';
import fs from 'fs';

async function testSizes() {
  const f1 = await sharp('./src/assets/ezgif-140247ce3ceb2550-jpg/ezgif-frame-120.jpg')
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
  console.log('1920x1080 WebP quality 82 size:', Math.round(f1.length / 1024), 'KB');

  const f2 = await sharp('./src/assets/ezgif-140247ce3ceb2550-jpg/ezgif-frame-120.jpg')
    .resize(1600, 900)
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
  console.log('1600x900 WebP quality 82 size:', Math.round(f2.length / 1024), 'KB');

  const f3 = await sharp('./src/assets/ezgif-140247ce3ceb2550-jpg/ezgif-frame-120.jpg')
    .resize(1440, 810)
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
  console.log('1440x810 WebP quality 82 size:', Math.round(f3.length / 1024), 'KB');
}

testSizes();
