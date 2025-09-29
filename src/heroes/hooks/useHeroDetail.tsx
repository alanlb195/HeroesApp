import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/get-hero.action"


export const useHeroDetail = (slug: string) => {
    return useQuery({
        queryKey: ['hero', slug],
        queryFn: () => getHeroAction(slug),
        staleTime: 1000 * 60 * 5,
    });
}
