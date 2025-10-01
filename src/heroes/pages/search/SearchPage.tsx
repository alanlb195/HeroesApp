import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchHeroes } from "@/heroes/hooks/useSearchHeroes";
import { useSearchParams } from "react-router";


export const SearchPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;

    const { data: SearchedHeroes = [] } = useSearchHeroes({ name, strength })

    return (
        <>
            {/* Header */}
            <CustomJumbotron title="Super heroes search" description="Discover, explore, and manage your favorite superheroes and villains" />

            {/* Breadcrumbs */}
            <CustomBreadcrumbs currentPage="Buscador" />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            <HeroGrid heroes={SearchedHeroes} />
        </>
    )
}


export default SearchPage;