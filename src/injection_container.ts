import { createContainer } from "iti";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { PokemonLocalSourceImpl } from "./data/local/sources/pokemon_local_source";
import SpeciesRepositoryImpl from "./data/repositories/species_repository_impl";

const container = createContainer()
  .add({
    sqliteDb: () => {
      const dbFileName = process.env.DB_FILE_NAME!;
      return open({
        filename: dbFileName,
        driver: sqlite3.Database,
      });
    },
  })
  .add((items) => ({
    pokemonLocalSource: async () => {
      const db = await items.sqliteDb;
      return new PokemonLocalSourceImpl(db);
    },
  }))
  .add((items) => ({
    speciesRepository: async () => {
      const pokemonLocalSource = await items.pokemonLocalSource;
      return new SpeciesRepositoryImpl(pokemonLocalSource);
    },
  }))
  .addDisposer({
    sqliteDb: (db) => db.close(),
  });

export default container;
