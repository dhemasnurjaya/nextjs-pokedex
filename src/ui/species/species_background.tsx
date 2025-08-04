import pokemonColors from "@/ui/pokemon_colors";

type SpeciesBackgroundProps = {
  types: string;
  className?: string;
};

export default function SpeciesBackground({
  types: types,
  className,
}: SpeciesBackgroundProps) {
  const typeColor = pokemonColors[types.split(",")[0]];
  return (
    <div
      className={className ?? ""}
      style={{
        clipPath: "ellipse(140% 85% at 50% 0%)",
        backgroundColor: `${typeColor}`,
      }}
    />
  );
}
