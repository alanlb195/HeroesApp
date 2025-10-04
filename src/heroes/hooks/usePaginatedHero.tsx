
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';
import { useQuery } from '@tanstack/react-query';

export const usePaginatedHero = (
    page: number,
    limit: number,
    category = 'all'
) => {
    return useQuery({
        queryKey: ['heroes', { page, limit, category }],
        queryFn: () => getHeroesByPageAction(+page, +limit, category),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
