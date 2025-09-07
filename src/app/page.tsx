import { Suspense } from "react";
import SkeletonSection from "@/components/SkeletonSection";
import PokemonListSection from "@/components/PokemonListSection";

const DEFAULT_LIMIT = 12;

export default async function Page(props: {
  searchParams?: Promise<{ offset?: string; limit?: string }>;
}) {
  const sp = await props.searchParams;
  const offset = Number(sp?.offset ?? 0);
  const limit  = Number(sp?.limit  ?? DEFAULT_LIMIT);
  const suspenseKey = `${offset}-${limit}`;

  return (
    <main className="p-6 space-y-6">
      <Suspense key={suspenseKey} fallback={<SkeletonSection />}>
        <PokemonListSection offset={offset} limit={limit} />
      </Suspense>
    </main>
  );
}
