"use client"
export default function Error({ error, reset}: {error: Error; reset: ()=> void}) {
    return (
        <main className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-red-600">Oops, failed to load</h2>
            <p className="text-gray-700">{error.message}</p>
            <button onClick={reset} className="px-4 py-2 rounded bg-gray-200">
                Try Again
            </button>
        </main>
    );
}