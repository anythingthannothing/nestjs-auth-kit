import { dataSource } from './data-source';

const teardown = async () => {
  await dataSource.destroy();
};

export default teardown;
