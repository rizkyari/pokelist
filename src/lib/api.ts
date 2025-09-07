const BASE = "https://pokeapi.co/api/v2";

export async function apiFetch<T>(path: string, init?: RequestInit) : Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        cache: "no-store", 
        // next: { revalidate: 60 },
        ...init,
    });
    // const clone = res.clone();
    // const raw = await clone.text();
    // console.log("[fetch][body]", raw.slice(0, 400));
    if(!res.ok) throw new Error(`Fetch failed ${res.status}`);
    return res.json() as Promise<T>;
}