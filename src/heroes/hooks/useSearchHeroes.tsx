import { useQuery } from "@tanstack/react-query"
import { searchHeroesAction } from "../actions/search-heroes.action";

interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

export const useSearchHeroes = (opts: Options) => {
    const { category, name, status, strength, team, universe } = opts;
    return useQuery({
        queryKey: ['hero-search', { category, name, status, strength, team, universe }],
        queryFn: () => searchHeroesAction(opts),
        staleTime: 1000 * 60 * 5 // 5 min
    })
}
