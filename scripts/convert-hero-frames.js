import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcDir = './src/assets/ezgif-140247ce3ceb2550-jpg';
const destDir = './src/assets/hero-frames';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function convertAll() {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg')).sort();
  console.log(`Converting ${files.length} frames to WebP...`);
  const startTime = Date.now();

  const BATCH_SIZE = 12;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (file) => {
        const srcPath = path.join(srcDir, file);
        const destFile = file.replace('.jpg', '.webp');
        const destPath = path.join(destDir, destFile);

        await sharp(srcPath)
          .webp({ quality: 84, effort: 4 })
          .toFile(destPath);
      })
    );
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Conversion completed in ${duration}s.`);
}

convertAll();
