import { Injectable, NestMiddleware } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import { NextFunction } from 'express';

import { namespaceKey } from './namespace-key';

@Injectable()
export class TypeormTransactionMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction): void {
    const namespace = getNamespace(namespaceKey.TRANSACTION);

    if (!namespace) {
      throw Error('Transaction namespace does not exist');
    }

    return namespace.run(async () => Promise.resolve().then(next));
  }
}
