import { getNamespace } from 'cls-hooked';
import { EntityManager } from 'typeorm';

import { namespaceKey } from './namespace-key';
import { TypeOrmDatabase } from './type-orm-database';

export function Transactional() {
  return function (
    target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    async function transactionWrapped(...args: unknown[]) {
      const namespace = getNamespace(namespaceKey.TRANSACTION);
      let result: unknown = null;

      if (!namespace || !namespace.active) {
        throw new Error('Namespace is not active');
      }

      let entityManager = namespace.get(namespaceKey.ENTITY_MANAGER);

      if (!entityManager) {
        entityManager = TypeOrmDatabase.MysqlDataSource.createEntityManager();
        entityManager.transaction(
          async (transactionalEntityManager: EntityManager) => {
            namespace.set(
              namespaceKey.ENTITY_MANAGER,
              transactionalEntityManager,
            );
            result = await originalMethod.bind(target)(...args);
          },
        );
      } else {
        result = await originalMethod.bind(target)(...args);
      }

      return result;
    }

    descriptor.value = transactionWrapped;
  };
}
