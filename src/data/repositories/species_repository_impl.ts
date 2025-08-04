import Species from "@/domain/entities/species";
import SpeciesRepository from "@/domain/repositories/species_repository";
import PokemonLocalSource from "../local/sources/pokemon_local_source";

export default class SpeciesRepositoryImpl implements SpeciesRepository {
  private readonly source: PokemonLocalSource;

  constructor(source: PokemonLocalSource) {
    this.source = source;
  }

  async listSpecies({
    limit = 20,
    offset = 0,
    searchFilter = "",
  }: {
    limit?: number;
    offset?: number;
    searchFilter?: string;
  }): Promise<Species[]> {
    const species = await this.source.read<Species>(
      `SELECT
        ps.id,
        psn.name,
        GROUP_CONCAT(t.name) AS types,
        psn.genus
      FROM
        pokemon_v2_pokemonspecies ps
        JOIN pokemon_v2_pokemontype pt ON ps.id = pt.pokemon_id
        JOIN pokemon_v2_type t ON pt.type_id = t.id
        JOIN pokemon_v2_pokemonspeciesname psn ON ps.id = psn.pokemon_species_id
      WHERE
        (
          ps.id = ?
          OR psn.name LIKE ?
        )
        AND psn.language_id = 9
      GROUP BY
        ps.id
      LIMIT
        ? OFFSET ?`,
      [searchFilter, `%${searchFilter}%`, limit, offset],
    );
    return species;
  }

  async countSpeciesPage({
    itemsPerPage: speciesPerPage,
    searchFilter = "",
  }: {
    itemsPerPage: number;
    searchFilter?: string;
  }): Promise<number> {
    const result = await this.source.read<{ total: number }>(
      `SELECT
        count(*) as total
      from (
        SELECT
          ps.id
        FROM
          pokemon_v2_pokemonspecies ps
          JOIN pokemon_v2_pokemonspeciesname psn ON ps.id = psn.pokemon_species_id
        WHERE
        (
          ps.id = ?
          OR psn.name LIKE ?
        )
        AND psn.language_id = 9
        GROUP BY ps.id
      )`,
      [searchFilter, `%${searchFilter}%`],
    );

    const count = result[0]?.total ?? 0;
    return Math.ceil(count / speciesPerPage);
  }
}
