export interface IGetEntityRepository<P, E> {
  execute(predicate: P): Promise<E>;
}
