import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(root, 'src', 'assets');
const data = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data.json'), 'utf8'));
const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const expectedCore = ['rhen', 'sera', 'kael', 'liang', 'jin', 'lei', 'rui', 'ilyra', 'mo', 'arin', 'wen', 'yun', 'qin', 'han'];
const errors = [];
const warnings = [];

function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  const sof = new Set([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf]);
  let offset = 2;
  while (offset + 8 < buf.length) {
    if (buf[offset] !== 0xff) { offset += 1; continue; }
    while (buf[offset] === 0xff) offset += 1;
    const marker = buf[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker >= 0xd0 && marker <= 0xd7) continue;
    if (offset + 2 > buf.length) break;
    const length = buf.readUInt16BE(offset);
    if (sof.has(marker) && offset + 7 <= buf.length) {
      return { height: buf.readUInt16BE(offset + 3), width: buf.readUInt16BE(offset + 5) };
    }
    if (length < 2) break;
    offset += length;
  }
  return null;
}

function pngSize(buf) {
  const sig = '89504e470d0a1a0a';
  if (buf.subarray(0, 8).toString('hex') !== sig || buf.length < 24) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function read24LE(buf, offset) {
  return buf[offset] | (buf[offset + 1] << 8) | (buf[offset + 2] << 16);
}

function webpSize(buf) {
  if (buf.length < 30 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const type = buf.toString('ascii', 12, 16);
  if (type === 'VP8X') return { width: 1 + read24LE(buf, 24), height: 1 + read24LE(buf, 27) };
  if (type === 'VP8 ' && buf.length >= 30) return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  if (type === 'VP8L' && buf.length >= 25) {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  return null;
}

function dimensions(file, buf) {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return jpegSize(buf);
  if (ext === '.png') return pngSize(buf);
  if (ext === '.webp') return webpSize(buf);
  return null;
}

const files = fs.readdirSync(assetsDir).filter((file) => allowedExt.has(path.extname(file).toLowerCase()));
const mainByKey = new Map();
const extrasByKey = new Map();

for (const file of files) {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const extra = base.match(/^(.+)-extra-(\d+)$/);
  const key = extra ? extra[1] : base;
  if (!data.characters[key]) errors.push(`${file}: portrait key "${key}" does not exist in data.characters`);

  if (extra) {
    const index = Number(extra[2]);
    const list = extrasByKey.get(key) || [];
    list.push({ index, file });
    extrasByKey.set(key, list);
  } else {
    if (mainByKey.has(key)) errors.push(`${file}: duplicate main portrait key "${key}" (also ${mainByKey.get(key)})`);
    mainByKey.set(key, file);
  }

  const full = path.join(assetsDir, file);
  const buf = fs.readFileSync(full);
  if (buf.length > 3_000_000) errors.push(`${file}: ${(buf.length / 1_000_000).toFixed(1)} MB exceeds the 3 MB portrait limit`);
  const size = dimensions(file, buf);
  if (!size) {
    errors.push(`${file}: unable to read image dimensions`);
    continue;
  }
  const ratio = size.width / size.height;
  if (size.width < 240 || size.height < 320) errors.push(`${file}: ${size.width}x${size.height} is below the hard minimum 240x320`);
  else if (size.width < 600 || size.height < 800) warnings.push(`${file}: ${size.width}x${size.height} is below the preferred 600x800 source size`);
  if (ratio < 0.38 || ratio > 1.3) errors.push(`${file}: aspect ratio ${ratio.toFixed(2)} is outside the portrait-safe range 0.38–1.30`);
}

for (const key of expectedCore) {
  if (!mainByKey.has(key)) errors.push(`Missing main portrait for core character: ${key}`);
}

for (const [key, list] of extrasByKey) {
  list.sort((a, b) => a.index - b.index);
  const seen = new Set();
  list.forEach(({ index, file }) => {
    if (seen.has(index)) errors.push(`${file}: duplicate extra index ${index} for ${key}`);
    seen.add(index);
  });
  list.forEach(({ index }, i) => {
    const expected = i + 1;
    if (index !== expected) errors.push(`${key}: gallery extras must be contiguous from 1 (expected ${expected}, found ${index})`);
  });
}

for (const warning of warnings) console.warn(`WARN  ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  console.error(`\nPortrait validation failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`Portrait validation passed: ${files.length} image assets, ${warnings.length} warning(s).`);
