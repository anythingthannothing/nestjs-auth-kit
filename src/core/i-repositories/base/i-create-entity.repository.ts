export interface ICreateEntityRepository<D, E> {
  execute(dto: D): Promise<E>;
}
