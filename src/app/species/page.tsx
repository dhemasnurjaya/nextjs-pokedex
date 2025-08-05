import container from "@/injection_container";
import SpeciesGrid from "@/ui/species/species_grid";
import SpeciesPagination from "@/ui/species/species_pagination";
import SpeciesSearch from "@/ui/species/species_seach";

type SpeciesPageProps = {
  searchParams?: Promise<{ query?: string; page?: number }>;
};

export default async function SpeciesPage(props: SpeciesPageProps) {
  const itemsPerPage = 21;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const speciesRepo = await container.items.speciesRepository;
  const pageCount = await speciesRepo.countSpeciesPage({
    searchFilter: query,
    itemsPerPage: itemsPerPage,
  });

  return (
    <div className="flex flex-col grow gap-4 items-center">
      <SpeciesSearch />
      <SpeciesGrid
        query={query}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
      <SpeciesPagination
        totalPages={pageCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
}
