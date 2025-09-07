"use client";
import { useSearchParams } from "next/navigation";
import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  const sp = useSearchParams();
  const limit = Math.max(1, Number(sp.get("limit") ?? 12));

  return (
    <main className="p-6 space-y-6">
      <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      <div className="flex justify-between">
        <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    </main>
  );
}
