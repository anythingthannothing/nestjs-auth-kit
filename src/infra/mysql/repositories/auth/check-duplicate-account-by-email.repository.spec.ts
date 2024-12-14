import { DataSource } from 'typeorm';

import { createDataSource } from '../../../../../test/unit/create-data-source';
import { AccountEntity } from '../../entities';
import { CheckDuplicateAccountByEmailRepository } from './check-duplicate-account-by-email.repository';

describe('CheckDuplicateAccountByEmailRepository', () => {
  let dataSource: DataSource;
  let repository: CheckDuplicateAccountByEmailRepository;

  beforeAll(async () => {
    dataSource = await createDataSource();

    repository = new CheckDuplicateAccountByEmailRepository(
      dataSource.getRepository(AccountEntity),
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should return true if the email exists', async () => {
    // Given
    const email = 'test@example.com';
    await dataSource.getRepository(AccountEntity).save({ email });

    // When
    const result = await repository.execute(email);

    // Then
    expect(result).toBe(true);
  });

  it('should return false if the email does not exist', async () => {
    // Given
    const email = 'notfound@example.com';

    // When
    const result = await repository.execute(email);

    // Then
    expect(result).toBe(false);
  });
});
