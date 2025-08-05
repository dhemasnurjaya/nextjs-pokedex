import SpeciesModel from "@/data/local/models/species_model";
import { parse } from "csv-parse/sync";
import { promises as fs } from "fs";

export default interface PokemonLocalSource {
  readSpecies(): Promise<SpeciesModel[]>;
}

export class PokemonLocalSourceImpl implements PokemonLocalSource {
  async readSpecies(): Promise<SpeciesModel[]> {
    const csvContent = await fs.readFile("db/species.csv", "utf-8");
    const records = parse(csvContent, {
      delimiter: ";",
      skipEmptyLines: true,
      columns: true,
    }) as SpeciesModel[];
    return records;
  }
}
