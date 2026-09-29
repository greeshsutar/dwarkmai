import sharp from 'sharp';
import fs from 'fs';

async function processSample() {
  const f = await sharp('./src/assets/ezgif-140247ce3ceb2550-jpg/ezgif-frame-120.jpg').raw().toBuffer({ resolveWithObject: true });
  const { data, info } = f;
  const outData = Buffer.alloc(info.width * info.height * 4);

  // Background target: rgb(244, 240, 226)
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const srcIdx = (y * info.width + x) * 3;
      const dstIdx = (y * info.width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      // Measure distance from ivory background (243, 239, 227)
      const diff = Math.max(Math.abs(r - 243), Math.abs(g - 239), Math.abs(b - 227));

      outData[dstIdx] = r;
      outData[dstIdx + 1] = g;
      outData[dstIdx + 2] = b;

      if (diff < 12) {
        // Very close to ivory background -> fully transparent
        outData[dstIdx + 3] = 0;
      } else if (diff < 28) {
        // Transition region -> smooth alpha feathering
        const alpha = Math.round(((diff - 12) / 16) * 255);
        outData[dstIdx + 3] = alpha;
      } else {
        outData[dstIdx + 3] = 255;
      }
    }
  }

  await sharp(outData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
  .webp({ quality: 90 })
  .toFile('./src/assets/processed-frames/test-f120.webp');

  console.log('Processed test-f120.webp');
}

processSample();
