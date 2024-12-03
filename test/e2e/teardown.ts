import { exec } from 'child_process';

import { dataSource } from './data-source';

const execPromise = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return reject(error);
      }
      console.log(stdout);
      resolve();
    });
  });
};

const teardown = async () => {
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }

    console.log('Stopping Docker containers...');
    await execPromise('docker compose -f docker-compose.test.yml down');
    console.log('Docker containers stopped successfully.');
  } catch (error) {
    console.error('Error during teardown:', error);
  }
};

export default teardown;
