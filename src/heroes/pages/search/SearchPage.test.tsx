import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SearchPage from './SearchPage';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import type { Hero } from '@/heroes/interfaces/hero.interface';


vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid="custom-junbotron"></div>
}));

vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid="search-controls"></div>
}));


vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
        <div data-testid="hero-grid">
            {
                heroes.map((hero) => (
                    <div key={hero.id}>{hero.name}</div>
                ))
            }
        </div>
    )
}))


vi.mock('@/heroes/actions/search-heroes.action');

const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    )
}

describe('SearchPage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render SearchPage with default values', () => {
        const { container } = renderSearchPage();
        // screen.debug();

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: undefined,
            strength: undefined
        });
        expect(container).toMatchSnapshot();
    });

    test('should call search action with name parameter', () => {
        renderSearchPage(['/search?name=superman']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "superman",
            strength: undefined
        });
    });

    test('should call search action with strength parameter', () => {
        renderSearchPage(['/search?strength=7']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: undefined,
            strength: "7"
        });
    });

    test('should call search action with name and strength parameters', () => {
        renderSearchPage(['/search?name=superman&strength=7']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "superman",
            strength: "7"
        });
    });


    test('should render HeroGrid with search results', async () => {

        const mockHeroes = [
            { id: '1', name: "Clark Kent" } as unknown as Hero,
            { id: '2', name: "Bruce Wayne" } as unknown as Hero,
        ]

        mockSearchHeroesAction.mockResolvedValue(mockHeroes);
        renderSearchPage();

        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined();
            expect(screen.getByText('Bruce Wayne')).toBeDefined();
        })
        // screen.debug(screen.getByTestId('hero-grid'));

    });


});
