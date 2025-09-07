import PokemonCard from "./PokemonCard";
import { getPokemonIdFromUrl } from "@/lib/pokemon";
import { PokemonResult } from "@/types/pokemon";

type Props = { results: PokemonResult[] };

export default function PokemonGrid({ results }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md-grid-cols-4 xl:grid-cols-6 gap-4">
            {results.map((p: any) => {
                const id = getPokemonIdFromUrl(p.url);
                return <PokemonCard key={p.name} id={id} name={p.name} />
            })}
            {results.length === 0 && (
                <p className="text-gray-600">No Pokemon is found on this page.</p>
            )}
        </div>
    )
}