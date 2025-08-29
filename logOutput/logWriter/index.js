import fs from 'fs';

const randomString = Math.random().toString(36);
const filePath = process.env.FILE_PATH || 'randomLog.txt';
const writeToFile = () => {
  const output = `${new Date().toISOString()}: ${randomString}\n`;
  fs.appendFile(filePath, output, (err) => {
    if (err) {
      console.log(err);
    }
  });
  setTimeout(writeToFile, 5000);
};
writeToFile();
