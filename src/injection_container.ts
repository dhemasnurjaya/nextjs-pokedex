import { createContainer } from "iti";

import { PokemonLocalSourceImpl } from "@/data/local/sources/pokemon_local_source";
import SpeciesRepositoryImpl from "@/data/repositories/species_repository_impl";

const container = createContainer()
  .add(() => ({
    pokemonLocalSource: () => new PokemonLocalSourceImpl(),
  }))
  .add((items) => ({
    readSpecies: () => items.pokemonLocalSource.readSpecies(),
  }))
  .add((items) => ({
    speciesRepository: async () => {
      const species = await items.readSpecies;
      return new SpeciesRepositoryImpl({
        species: species,
      });
    },
  }));

export default container;
