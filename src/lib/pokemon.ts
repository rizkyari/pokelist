import { apiFetch } from "./api";
import { PokemonResponse } from "@/types/pokemon";

export async function getPokemonList(offset = 0, limit = 12) {
    return apiFetch<PokemonResponse>(`/pokemon?offset=${offset}&limit${limit}`);
}

export function getPokemonIdFromUrl(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length -1];
}

export function getSpriteUrl(id: string | number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}