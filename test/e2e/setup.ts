import { dataSource } from './data-source';

const setup = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await dataSource.initialize();
};

export default setup;
