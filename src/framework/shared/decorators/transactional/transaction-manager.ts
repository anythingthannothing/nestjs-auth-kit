import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionManager {
  constructor(
    @InjectDataSource()
    private mysqlDatasource: DataSource,
  ) {}
  getEntityManager(): EntityManager {
    return this.mysqlDatasource.createEntityManager();
  }
}
