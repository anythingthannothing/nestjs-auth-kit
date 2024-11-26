import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import { EntityManager, EntityTarget, ObjectLiteral } from 'typeorm';

import { namespaceKeyConst } from '../lib/consts/namespaceKeys.const';

@Injectable()
export class DbContextProvider {
  public getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>) {
    const namespace = getNamespace(namespaceKeyConst.ENTITY_MANAGER);

    if (!namespace || !namespace.active) {
      throw new InternalServerErrorException(`No context for database.`);
    }

    const entityManager = namespace.get(
      namespaceKeyConst.ENTITY_MANAGER,
    ) as EntityManager;

    return entityManager.getRepository(entity);
  }
}
