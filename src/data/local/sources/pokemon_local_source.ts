import { Database } from "sqlite";

export default interface PokemonLocalSource {
  read<TResult>(sql: string, params?: unknown[]): Promise<TResult[]>;
}

export class PokemonLocalSourceImpl implements PokemonLocalSource {
  private readonly db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  read<TResult>(sql: string, params?: unknown[]): Promise<TResult[]> {
    return this.db.all<TResult[]>(sql, params ?? []);
  }
}
