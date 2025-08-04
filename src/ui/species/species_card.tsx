import Species from "@/domain/entities/species";
import Image from "next/image";
import SpeciesBackground from "@/ui/species/species_background";
import SpeciesTypeChips from "@/ui/species/species_type_chips";
import { Card } from "../components/card";

function padId(id: number): string {
  // pad pokemon ID with leading zeroes
  let paddedStr = "" + id;
  while (paddedStr.length < 4) {
    paddedStr = "0" + paddedStr;
  }
  return paddedStr;
}

function getPokemonSpriteSrc(id: number): string {
  const imgFileName = padId(id);
  return "/sprites/pokemon/" + imgFileName + ".webp";
}

export default async function SpeciesCard({ species }: { species: Species }) {
  return (
    <Card className="relative overflow-hidden p-0">
      <SpeciesBackground
        types={species.types}
        className="absolute w-full h-3/4 z-0"
      />
      <div className="relative flex flex-col items-center p-4 gap-0">
        <Image
          src={getPokemonSpriteSrc(species.id)}
          width={150}
          height={150}
          alt={species.name}
          className="pt-2"
        />
        <div className="text-lg">{species.name}</div>
        <SpeciesTypeChips types={species.types} />
      </div>
    </Card>
  );
}
