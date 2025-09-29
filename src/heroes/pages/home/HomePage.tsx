import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"

import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const { data: heroResponse } = usePaginatedHero(+page, +limit, category);
    const { data: summary } = useHeroSummary();


    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains']
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);
    return (
        <>
            {/* Header */}
            <CustomJumbotron title="Superhero Universe" description="Discover, explore, and manage your favorite superheroes and villains" />

            {/* Breadcrumbs */}
            <CustomBreadcrumbs currentPage="Super heroes" breadcrumbs={[
                // {
                //     label: 'a new crumb',
                //     to: '/newCrumb'
                // }
            ]} />

            {/* Stats Dashboard */}
            <HeroStats />


            {/* Tabs */}
            <Tabs value={selectedTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="all"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'all');
                            prev.set('category', 'all');
                            return prev;
                        })}
                    >
                        All Characters ({summary?.totalHeroes})
                    </TabsTrigger>

                    {/* TODO: favorites in localStorage */}
                    <TabsTrigger
                        value="favorites"
                        className="flex items-center gap-2"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'favorites');
                            return prev
                        })}
                    >
                        Favorites (3)
                    </TabsTrigger>

                    <TabsTrigger
                        value="heroes"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'heroes');
                            prev.set('category', 'hero');
                            prev.set('page', '1');
                            return prev
                        })}
                    >Heroes ({summary?.heroCount})
                    </TabsTrigger>

                    <TabsTrigger
                        value="villains"
                        onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'villains');
                            prev.set('category', 'villain');
                            prev.set('page', '1');
                            return prev
                        })}
                    >
                        Villains ({summary?.villainCount})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    {/* Character Grid */}
                    <HeroGrid heroes={heroResponse?.heroes ?? []} />
                </TabsContent>
                <TabsContent value="favorites">
                    {/* Character Grid */}
                </TabsContent>
                <TabsContent value="heroes">
                    {/* Character Grid */}
                    <HeroGrid heroes={heroResponse?.heroes ?? []} />
                </TabsContent>
                <TabsContent value="villains">
                    {/* Character Grid */}
                    <HeroGrid heroes={heroResponse?.heroes ?? []} />
                </TabsContent>
            </Tabs>


            {/* Pagination */}
            <CustomPagination totalPages={heroResponse?.pages ?? 1} />
        </>
    )
}


export default HomePage;