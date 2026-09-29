import sharp from 'sharp';

async function checkBounds() {
  const f = await sharp('./src/assets/ezgif-140247ce3ceb2550-jpg/ezgif-frame-240.jpg').raw().toBuffer({ resolveWithObject: true });
  const { data, info } = f;
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const diff = Math.max(Math.abs(r - 244), Math.abs(g - 240), Math.abs(b - 226));
      if (diff > 18) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Building content bounds in 1920x1080:', { minX, maxX, minY, maxY });
}

checkBounds();
