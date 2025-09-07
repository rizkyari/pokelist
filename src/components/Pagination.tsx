import Link from "next/link";

type Props = {
    offset: number;
    limit: number;
    hasPrev: boolean;
    hasNext: boolean;
};

export default function Pagination({offset, limit, hasPrev, hasNext}: Props) {
    const prevOffset = Math.max(offset - limit, 0);
    const nextOffset = offset + limit;

    const baseBtn = "px-4 py-2 rounded bg-blue-500 disabled:opacity-50 text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
    return (
        <div className="flex items-center justify-between mt-6">
            <Link
            className={`${baseBtn} ${!hasPrev ? "pointer-events-none bg-gray-400" : ""}`}
            aria-disabled={!hasPrev}
            aria-label="Previous page"
            rel="prev"
            href={`/?offset=${prevOffset}&limit=${limit}`}
            prefetch={false}
            >
                Previous
            </Link>
            <Link
            className={`${baseBtn} ${!hasNext ? "pointer-events-none" : ""}`}
            aria-disabled={!hasNext}
            aria-label="Next page"
            rel="next"
            href={`/?offset=${nextOffset}&limit=${limit}`}
            prefetch={false}
            >
                Next
            </Link>
        </div>
    )
}