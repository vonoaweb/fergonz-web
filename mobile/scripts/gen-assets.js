/* Generates VidaLink app assets (blood-drop mark) as PNGs, no external deps. */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const RED = [245, 51, 76];
const RED_DARK = [194, 29, 58];
const WHITE = [255, 255, 255];

function lerp(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function inDrop(x, y, N, scale, offsetY) {
  const cx = N / 2;
  const r = N * 0.26 * scale;
  const cy = N * (0.62 + offsetY);
  const apexY = N * (0.14 + offsetY);
  // bottom circle
  const dx = x - cx;
  const dy = y - cy;
  if (dx * dx + dy * dy <= r * r) return true;
  // triangle apex -> circle tangents (approx horizontal extremes)
  if (y >= apexY && y <= cy) {
    const t = (y - apexY) / (cy - apexY);
    const halfWidth = r * t;
    if (Math.abs(dx) <= halfWidth) return true;
  }
  return false;
}

function makePNG(N, opts) {
  const { bg, drop, dropScale = 1, transparentBg = false, offsetY = 0 } = opts;
  const raw = Buffer.alloc(N * (N * 4 + 1));
  for (let y = 0; y < N; y++) {
    raw[y * (N * 4 + 1)] = 0; // filter byte
    for (let x = 0; x < N; x++) {
      const idx = y * (N * 4 + 1) + 1 + x * 4;
      let color;
      let alpha = 255;
      if (inDrop(x, y, N, dropScale, offsetY)) {
        // vertical gradient on the drop
        const t = Math.min(1, Math.max(0, (y / N - 0.1) / 0.8));
        color = lerp(drop.top, drop.bottom, t);
      } else if (transparentBg) {
        color = [0, 0, 0];
        alpha = 0;
      } else {
        const t = y / N;
        color = lerp(bg.top, bg.bottom, t);
      }
      raw[idx] = color[0];
      raw[idx + 1] = color[1];
      raw[idx + 2] = color[2];
      raw[idx + 3] = alpha;
    }
  }
  return encodePNG(N, N, raw);
}

function encodePNG(width, height, raw) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])) >>> 0, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

const outDir = path.join(__dirname, '..', 'assets');
fs.mkdirSync(outDir, { recursive: true });

const bg = { top: RED, bottom: RED_DARK };
const drop = { top: WHITE, bottom: [240, 240, 245] };

// App icon: white drop on red gradient.
fs.writeFileSync(path.join(outDir, 'icon.png'), makePNG(1024, { bg, drop, dropScale: 1 }));
// Adaptive icon foreground: drop centered, transparent background.
fs.writeFileSync(
  path.join(outDir, 'adaptive-icon.png'),
  makePNG(1024, { bg, drop, dropScale: 0.72, transparentBg: true }),
);
// Splash: smaller centered drop on red.
fs.writeFileSync(
  path.join(outDir, 'splash.png'),
  makePNG(1024, { bg, drop, dropScale: 0.85 }),
);
// Favicon.
fs.writeFileSync(path.join(outDir, 'favicon.png'), makePNG(96, { bg, drop, dropScale: 0.9 }));

console.log('Assets generated in', outDir);
