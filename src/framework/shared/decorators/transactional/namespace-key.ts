import { createNamespace } from 'cls-hooked';

export const namespaceKey = {
  TRANSACTION: 'namespaces/transaction',
  ENTITY_MANAGER: 'namespaces/entity-manager',
};

createNamespace(namespaceKey.ENTITY_MANAGER);
createNamespace(namespaceKey.TRANSACTION);
