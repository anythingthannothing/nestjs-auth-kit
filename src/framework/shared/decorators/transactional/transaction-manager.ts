import { Injectable } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import { EntityManager } from 'typeorm';

import { namespaceKey } from './namespace-key';
import { TypeOrmDatabase } from './type-orm-database';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const namespace = getNamespace(namespaceKey.TRANSACTION);

    if (!namespace || !namespace.active) {
      throw new Error('Namespace is not active');
    }

    return (
      namespace.get(namespaceKey.ENTITY_MANAGER) ||
      TypeOrmDatabase.MysqlDataSource.createEntityManager()
    );
  }
}
