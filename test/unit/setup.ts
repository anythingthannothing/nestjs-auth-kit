import * as fs from 'fs';
import * as path from 'path';

import { dataSource } from '../e2e/data-source';

const setup = async () => {
  const distPath = path.join(__dirname, 'test-dist');

  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }

  await dataSource.initialize();
  await dataSource.manager.query(
    `INSERT INTO user (nickname) VALUES ('testuser')`,
  );
  await dataSource.manager.query(
    `INSERT INTO account (email) VALUES ('testuseremail@google.com')`,
  );
};

export default setup;
