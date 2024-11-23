export interface ICheckDuplicateEntityRepository<P> {
  execute(predicate: P): Promise<boolean>;
}
