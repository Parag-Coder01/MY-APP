import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, drawFn) {
  // CRC table
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type);
    const body = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crc]);
  }

  // PNG Header
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA color type
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw image data with scanline filter byte 0 (None)
  const rowSize = width * 4;
  const rawData = Buffer.alloc(height * (rowSize + 1));

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (rowSize + 1);
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, makeChunk('IHDR', ihdr), idatChunk, iendChunk]);
}

// Drawing function for Kite Robotics Icon
function drawKiteIcon(x, y, width, height, isMaskable = false) {
  const cx = width / 2;
  const cy = height / 2;
  const scale = isMaskable ? 0.75 : 0.88;
  const maxR = (width / 2) * scale;

  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background deep gradient #020617 to #0f172a
  const gradT = (y / height);
  let bgR = Math.floor(2 + gradT * (15 - 2));
  let bgG = Math.floor(6 + gradT * (23 - 6));
  let bgB = Math.floor(23 + gradT * (42 - 23));

  // Kite diamond test:
  // Top: (cx, cy - maxR * 0.85)
  // Bottom: (cx, cy + maxR * 0.9)
  // Left: (cx - maxR * 0.7, cy)
  // Right: (cx + maxR * 0.7, cy)
  const normX = Math.abs(dx) / (maxR * 0.7);
  let normY = 0;
  if (dy < 0) {
    normY = -dy / (maxR * 0.85);
  } else {
    normY = dy / (maxR * 0.9);
  }

  // Inside kite diamond
  if (normX + normY <= 1.0) {
    // Cyan to blue to purple gradient
    const kiteT = (dy + maxR * 0.85) / (maxR * 1.75);
    let kr = Math.floor(6 + kiteT * (139 - 6));
    let kg = Math.floor(182 + kiteT * (92 - 182));
    let kb = Math.floor(212 + kiteT * (246 - 212));

    // Center microchip (square: [-0.22*maxR, 0.22*maxR])
    const chipSize = maxR * 0.22;
    if (Math.abs(dx) <= chipSize && Math.abs(dy) <= chipSize) {
      if (Math.abs(dx) >= chipSize - 2 || Math.abs(dy) >= chipSize - 2) {
        // Cyan chip border
        return [56, 189, 248, 255];
      }
      // Chip core
      if (dist <= chipSize * 0.5) {
        // Gold / Amber glowing core
        return [251, 191, 36, 255];
      }
      return [2, 6, 23, 255];
    }

    // Wing split highlight
    if (dx < 0) {
      // Lighten left wing
      kr = Math.min(255, kr + 30);
      kg = Math.min(255, kg + 40);
      kb = Math.min(255, kb + 20);
    }

    return [kr, kg, kb, 255];
  }

  // Outer subtle grid circle
  if (Math.abs(dist - maxR * 0.92) <= 1.5) {
    return [14, 116, 144, 255]; // cyan ring
  }

  return [bgR, bgG, bgB, 255];
}

const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate files
fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), createPNG(192, 192, (x, y, w, h) => drawKiteIcon(x, y, w, h, false)));
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), createPNG(512, 512, (x, y, w, h) => drawKiteIcon(x, y, w, h, false)));
fs.writeFileSync(path.join(outDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, (x, y, w, h) => drawKiteIcon(x, y, w, h, true)));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), createPNG(180, 180, (x, y, w, h) => drawKiteIcon(x, y, w, h, false)));

console.log('Successfully generated all PWA icons: 192x192, 512x512, maskable 512x512, and apple-touch-icon.png');
