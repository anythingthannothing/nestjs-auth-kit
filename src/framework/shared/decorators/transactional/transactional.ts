import { getNamespace } from 'cls-hooked';

import { namespaceKey } from './namespace-key';

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

      const entityManager = namespace.get(namespaceKey.ENTITY_MANAGER)!;

      entityManager.transaction(async () => {
        result = await originalMethod.bind(target)(...args);
      });

      return result;
    }

    descriptor.value = transactionWrapped;
  };
}
