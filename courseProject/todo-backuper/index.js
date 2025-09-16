import { exec } from 'child_process';
import { Storage } from '@google-cloud/storage';

const dbUser = process.env.POSTGRES_USER;
const dbName = process.env.POSTGRES_DB;
const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;
const bucketName = process.env.BUCKET_NAME;
const dbPassword = process.env.POSTGRES_PASSWORD;
process.env.PGPASSWORD = dbPassword;
const backupFilePath = `/tmp/${backupFileName}`;

const storage = new Storage();

async function uploadFile() {
  const options = {
    destination: backupFileName,
  };

  await storage.bucket(bucketName).upload(backupFilePath, options);
  console.log(`${backupFilePath} uploaded to ${bucketName}`);
}

const createBackup = () => {
  exec(
    `pg_dump -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -f ${backupFilePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during pg_dump: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`pg_dump stderr: ${stderr}`);
      }
      console.log(`Backup saved to ${backupFilePath}`);
      uploadFile().catch(console.error);
    }
  );
};

createBackup();
