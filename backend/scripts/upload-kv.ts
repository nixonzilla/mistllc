import fs from 'fs/promises';
import path from 'path';
import { execFileSync } from 'child_process';

const DIST_DIR = path.resolve('./frontend/dist');
const KV_NAMESPACE = process.env.KV_NAMESPACE; // e.g., mistllc

if (!KV_NAMESPACE) {
  throw new Error('Please set KV_NAMESPACE environment variable.');
}

async function uploadFile(filePath: string, keyPrefix = '') {
  const data = await fs.readFile(filePath, 'utf-8');
  const relativePath = path.relative(DIST_DIR, filePath);
  const key = path.join(keyPrefix, relativePath).replace(/\\/g, '/');

  console.log(`Uploading ${key} ...`);

  execFileSync(
    'wrangler',
    ['kv:key', 'put', `--binding=${KV_NAMESPACE}`, key, data],
    { stdio: 'inherit' }
  );
}

async function walk(dir: string) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await walk(fullPath);
    } else {
      await uploadFile(fullPath);
    }
  }
}

walk(DIST_DIR).then(() => console.log('All frontend files uploaded to KV!'));
