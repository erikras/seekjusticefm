import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  type MediaManifest,
  getMediaMetadataForFile,
  loadMediaManifest,
  saveMediaManifest,
} from '../util/mediaManifest';

const mediaDirectory = path.join(process.cwd(), 'public', 'media');
const bucketName = process.env.CLOUDFLARE_R2_BUCKET || 'seekjustice-media';

function resolveAudioFiles(args: string[]): string[] {
  if (args.length > 0) {
    return Array.from(
      new Set(
        args.map((input) =>
          path.isAbsolute(input) ? input : path.join(process.cwd(), input)
        )
      )
    );
  }

  if (!fs.existsSync(mediaDirectory)) {
    return [];
  }

  return fs
    .readdirSync(mediaDirectory)
    .filter((filename) => filename.endsWith('.mp3'))
    .map((filename) => path.join(mediaDirectory, filename))
    .sort();
}

function uploadFileToR2(filePath: string, key: string): void {
  const result = spawnSync(
    'pnpm',
    [
      'exec',
      'wrangler',
      'r2',
      'object',
      'put',
      `${bucketName}/${key}`,
      '--file',
      filePath,
      '--remote',
      '--content-type',
      'audio/mpeg',
      '--cache-control',
      'public, max-age=31536000, immutable',
    ],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
    }
  );

  if (result.status !== 0) {
    throw new Error(`wrangler upload failed for ${filePath}`);
  }
}

function bucketNeedsBootstrap(probeKey?: string): boolean {
  const result = spawnSync(
    'pnpm',
    ['exec', 'wrangler', 'r2', 'bucket', 'info', bucketName],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
    }
  );

  if (result.status !== 0) {
    throw new Error(`Unable to inspect R2 bucket ${bucketName}`);
  }

  const objectCountLine = result.stdout
    .split('\n')
    .find((line) => line.trim().startsWith('object_count:'));

  if (!objectCountLine) {
    return false;
  }

  const objectCount = Number.parseInt(objectCountLine.split(':')[1].trim(), 10);
  if (!Number.isFinite(objectCount) || objectCount > 0) {
    return false;
  }

  if (!probeKey) {
    return true;
  }

  const probeResult = spawnSync(
    'pnpm',
    [
      'exec',
      'wrangler',
      'r2',
      'object',
      'get',
      `${bucketName}/${probeKey}`,
      '--file',
      os.devNull,
      '--remote',
    ],
    {
      cwd: process.cwd(),
      stdio: 'ignore',
    }
  );

  return probeResult.status !== 0;
}

async function uploadAudioToR2(args: string[]): Promise<void> {
  const explicitFiles = args.length > 0;
  let manifest: MediaManifest = {};

  try {
    manifest = loadMediaManifest();
  } catch (_error) {
    manifest = {};
  }

  const files = resolveAudioFiles(args);

  if (files.length === 0) {
    console.log('No local MP3 files found to upload.');
    return;
  }

  let uploadedCount = 0;
  const firstProbeKey =
    files.length > 0 ? `media/${path.basename(files[0])}` : undefined;
  const shouldBootstrapBucket =
    !explicitFiles && bucketNeedsBootstrap(firstProbeKey);

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Audio file does not exist: ${filePath}`);
    }

    if (!filePath.endsWith('.mp3')) {
      throw new Error(`Audio file must be an MP3: ${filePath}`);
    }

    const filename = path.basename(filePath);
    const key = `media/${filename}`;
    const sizeBytes = fs.statSync(filePath).size;
    const existingMetadata = manifest[key];
    const shouldUpload =
      explicitFiles ||
      shouldBootstrapBucket ||
      !existingMetadata ||
      existingMetadata.sizeBytes !== sizeBytes;

    if (!shouldUpload) {
      console.log(`Skipping ${filename}; manifest already matches local file size.`);
      continue;
    }

    console.log(`Uploading ${filename} to R2...`);
    uploadFileToR2(filePath, key);

    manifest[key] = await getMediaMetadataForFile(filePath);
    uploadedCount += 1;
  }

  if (uploadedCount === 0) {
    console.log('No audio files needed upload.');
    return;
  }

  saveMediaManifest(manifest);
  console.log(`Uploaded ${uploadedCount} audio file(s) and updated the manifest.`);
}

if (require.main === module) {
  uploadAudioToR2(process.argv.slice(2)).catch((error) => {
    console.error('Error uploading audio to R2:', error);
    process.exitCode = 1;
  });
}

export { uploadAudioToR2 };
