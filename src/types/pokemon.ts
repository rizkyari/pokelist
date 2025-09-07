export interface PokemonResult {
    name: string;
    url: string;
}

export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}