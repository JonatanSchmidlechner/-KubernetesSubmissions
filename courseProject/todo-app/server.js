import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rootRouter from './routes/index.js';
import { ensureImageDir, ensureImageExists } from './services/imageManager.js';
import methodOverride from 'method-override';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath =
  process.env.FILE_PATH || path.resolve(__dirname, 'images/image.png');
const imagesDir = path.dirname(filePath);

await ensureImageDir(imagesDir);

app.use('/images', express.static(imagesDir));
app.set('view engine', 'ejs');

app.use(rootRouter);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await ensureImageExists(filePath);
});
