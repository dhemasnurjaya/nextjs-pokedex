import pokemonColors from "@/ui/pokemon_colors";

type SpeciesTypeChipsProps = {
  types: string;
};

export default function SpeciesTypeChips({ types }: SpeciesTypeChipsProps) {
  const speciesTypes = types.split(",");
  const chips = speciesTypes.map((t) => (
    <div
      key={t}
      className="py-0 px-1 rounded-md text-gray-50"
      style={{
        backgroundColor: `${pokemonColors[t]}`,
      }}
    >
      {t}
    </div>
  ));
  return <div className="flex gap-1 items-center">{chips}</div>;
}
