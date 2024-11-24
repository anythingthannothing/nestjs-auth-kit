export interface IUnitOfWorkProvider<T> {
  dataSource: T;
  commit(callback: (...args: unknown[]) => unknown): Promise<unknown>;
  rollback(callback: (...args: unknown[]) => unknown): Promise<unknown>;
  startTransaction(): Promise<unknown>;
}
