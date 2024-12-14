import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { createNamespace, getNamespace } from 'cls-hooked';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';

import { throwDatabaseErrorException } from '../exceptions';
import { namespaceKeyConst } from '../lib/consts/namespaceKeys.const';

createNamespace(namespaceKeyConst.ENTITY_MANAGER);

@Injectable()
export class UnitOfWorkProvider {
  constructor(@InjectDataSource() public readonly dataSource: DataSource) {}

  public async commit<T>(callback: () => Promise<T>): Promise<T> {
    const namespace = getNamespace(namespaceKeyConst.ENTITY_MANAGER);

    if (!namespace) {
      return throwDatabaseErrorException({
        cause: `Unable to commit: ${namespaceKeyConst.ENTITY_MANAGER}`,
      });
    }

    const entityManager = this.dataSource.createEntityManager();

    return new Promise<T>((resolve, reject) => {
      namespace.run(async () => {
        try {
          await entityManager.transaction(async (em: EntityManager) => {
            namespace.set(namespaceKeyConst.ENTITY_MANAGER, em);
            const callbackResult = await callback();
            resolve(callbackResult);
          });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public async rollback<T>(callback: () => Promise<T>): Promise<T> {
    const namespace = getNamespace(namespaceKeyConst.ENTITY_MANAGER);

    if (!namespace) {
      return throwDatabaseErrorException({
        cause: `Unable to commit: ${namespaceKeyConst.ENTITY_MANAGER}`,
      });
    }

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    return new Promise<T>((resolve, reject) => {
      namespace.run(async () => {
        try {
          await queryRunner.startTransaction();
          const em = queryRunner.manager;
          namespace.set(namespaceKeyConst.ENTITY_MANAGER, em);

          await queryRunner.rollbackTransaction();
          resolve(await callback());
        } catch (error) {
          await queryRunner.rollbackTransaction();
          reject(error);
        } finally {
          await queryRunner.release();
        }
      });
    });
  }
}
