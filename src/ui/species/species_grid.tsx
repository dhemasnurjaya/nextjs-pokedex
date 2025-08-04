import container from "@/injection_container";
import SpeciesCard from "@/ui/species/species_card";

type SpeciesGridProps = {
  query: string;
  itemsPerPage: number;
  currentPage: number;
};

export default async function SpeciesGrid(props: SpeciesGridProps) {
  const repo = await container.items.speciesRepository;
  const species = await repo.listSpecies({
    searchFilter: props.query,
    limit: props.itemsPerPage,
    offset: (props.currentPage - 1) * props.itemsPerPage,
  });
  const speciesCards = species.map((s) => (
    <SpeciesCard key={s.name} species={s} />
  ));

  return <div className="flex flex-wrap w-full gap-4">{speciesCards}</div>;
}
