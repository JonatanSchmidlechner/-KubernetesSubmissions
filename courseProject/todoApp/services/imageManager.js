import fetch from 'node-fetch';
import { promises as fs } from 'fs';

let state = {
  needNewImage: false,
  showImageOnceMore: false,
  isDownloadInProgress: false,
};

const imageDuration = 600000;

export async function ensureImageDir(imagesDir) {
  await fs.mkdir(imagesDir, { recursive: true });
}

export async function downloadImage(filePath) {
  if (state.isDownloadInProgress) return;

  state.isDownloadInProgress = true;
  try {
    const imgURL = 'https://picsum.photos/800';
    const response = await fetch(imgURL);

    if (!response.ok) {
      throw new Error(`Image download failed: ${response.statusText}`);
    }

    const imgBuffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(filePath, imgBuffer);

    state.needNewImage = false;
    console.log('Image downloaded successfully.');

    setTimeout(() => {
      state.showImageOnceMore = true;
    }, imageDuration);

  } catch (error) {
    console.error(error.message);
  } finally {
    state.isDownloadInProgress = false;
  }
}

export async function ensureImageExists(filePath) {
  try {
    await fs.access(filePath);
    console.log('Image already exists.');
    setTimeout(() => {
      state.showImageOnceMore = true;
    }, imageDuration);
  } catch {
    console.log('Image does not exist. Downloading...');
    await downloadImage(filePath);

  }
}

export async function handleImageState(filePath = 'images/image.png') {
  if (state.needNewImage) {
    await downloadImage(filePath).catch(err => console.log(err.message));
  }

  if (state.showImageOnceMore) {
    state.needNewImage = true;
    state.showImageOnceMore = false;
  }
}