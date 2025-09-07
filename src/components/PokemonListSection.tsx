import PokemonGrid from "./PokemonGrid";
import Pagination from "./Pagination";
import { getPokemonList } from "@/lib/pokemon";

export default async function PokemonListSection({
  offset,
  limit,
}: { offset: number; limit: number }) {
  const data = await getPokemonList(offset, limit);

  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(data.count / limit);
  const start = data.count === 0 ? 0 : offset + 1;
  const end = Math.min(offset + data.results.length, data.count);

  return (
    <>
      <header className="md:flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-500">Pokemon list</h1>
        <p className="text-sm text-gray-500">
          Showing {start}-{end} of {data.count} (Page {page}/{totalPages})
        </p>
      </header>

      <PokemonGrid results={data.results} />

      <Pagination
        offset={offset}
        limit={limit}
        hasPrev={!!data.previous || offset > 0}
        hasNext={!!data.next || offset + data.results.length < data.count}
      />
    </>
  );
}
