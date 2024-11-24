import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UnitOfWorkProvider {
  constructor(@InjectDataSource() public readonly dataSource: DataSource) {}

  public async commit(callback: () => Promise<unknown>) {
    const queryRunner = await this.startTransaction();
    let result;
    try {
      result = await callback();
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  public async rollback(callback: (...args: unknown[]) => Promise<unknown>) {
    const queryRunner = await this.startTransaction();
    let result;

    try {
      result = await callback();
      await queryRunner.rollbackTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  private async startTransaction() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }
}
