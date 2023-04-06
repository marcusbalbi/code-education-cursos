export default interface RepositoryInterface<T> {

  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[]>
}
