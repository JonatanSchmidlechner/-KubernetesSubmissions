import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const todos = ['Learn Javascript', 'Learn React', 'Build a project'];

const filePath =
  process.env.FILE_PATH || path.resolve(__dirname, 'images/image.png');

const imagesDir = path.dirname(filePath);
await fs.mkdir(imagesDir, { recursive: true });

app.use('/images', express.static(imagesDir));
app.set('view engine', 'ejs');

let needNewImage = false;
let showImageOnceMore = false;
let isDownloadInProgress = false;

const downloadImage = async () => {
  isDownloadInProgress = true;
  const imgURL = 'https://picsum.photos/800';
  const response = await fetch(imgURL);
  if (!response.ok) {
    console.log(response.statusText);
    throw new Error('Could not download image.');
  }
  const imgBuffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(filePath, imgBuffer);
  needNewImage = false;
  isDownloadInProgress = false;
  setTimeout(() => {
    showImageOnceMore = true;
  }, 600000);
};

app.get('/', async (req, res) => {
  if (needNewImage && !isDownloadInProgress) {
    try {
      downloadImage();
    } catch (error) {
      console.log('Could not download image');
    }
  }
  if (showImageOnceMore) {
    console.log('Last image was shown, deleting image.');
    needNewImage = true;
    showImageOnceMore = false;
  }
  res.render('index', { filePath: '/images/image.png', todos: todos });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

try {
  await fs.access(filePath);
  console.log('File exists');
  setTimeout(() => {
    showImageOnceMore = true;
  }, 600000);
  isDownloadInProgress = false;
} catch {
  console.log('File does not exist');
  downloadImage();
}
