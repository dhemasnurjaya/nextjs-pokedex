import SpeciesModel from "@/data/local/models/species_model";
import Species from "@/domain/entities/species";
import SpeciesRepository from "@/domain/repositories/species_repository";

export default class SpeciesRepositoryImpl implements SpeciesRepository {
  private readonly species: SpeciesModel[];

  constructor({ species }: { species: SpeciesModel[] }) {
    this.species = species;
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
    const result = this.species
      .filter((s) => {
        const id = s.id;
        const name = s.name.toLowerCase();
        const filter = searchFilter.toLowerCase();
        return name.includes(filter) || id.includes(filter);
      })
      .slice(offset, offset + limit);
    const species: Species[] = result.map((s) => ({
      id: s.id,
      name: s.name,
      types: s.types,
      genus: s.genus,
    }));
    return species;
  }

  async countSpeciesPage({
    itemsPerPage: speciesPerPage,
    searchFilter = "",
  }: {
    itemsPerPage: number;
    searchFilter?: string;
  }): Promise<number> {
    const count = this.species.filter((s) => {
      const id = s.id;
      const name = s.name.toLowerCase();
      const filter = searchFilter.toLowerCase();
      return name.includes(filter) || id.includes(filter);
    }).length;
    return Math.ceil(count / speciesPerPage);
  }
}
