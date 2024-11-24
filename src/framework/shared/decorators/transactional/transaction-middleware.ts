import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import { NextFunction } from 'express';

import { namespaceKey } from './namespace-key';
import { TransactionManager } from './transaction-manager';

@Injectable()
export class TypeormTransactionMiddleware implements NestMiddleware {
  constructor(
    @Inject(TransactionManager)
    private readonly transactionManager: TransactionManager,
  ) {}

  async use(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const namespace = getNamespace(namespaceKey.TRANSACTION);

    if (!namespace) {
      throw Error('Transaction namespace does not exist');
    }

    namespace.run(async () => {
      const entityManager = this.transactionManager.getEntityManager();

      namespace.set(namespaceKey.ENTITY_MANAGER, entityManager);

      return next();
    });
  }
}
