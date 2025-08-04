import Species from "@/domain/entities/species";

export default interface SpeciesRepository {
  listSpecies({
    limit,
    offset,
    searchFilter,
  }: {
    limit?: number;
    offset?: number;
    searchFilter?: string;
  }): Promise<Species[]>;

  countSpeciesPage({
    itemsPerPage,
    searchFilter,
  }: {
    itemsPerPage: number;
    searchFilter?: string;
  }): Promise<number>;
}
