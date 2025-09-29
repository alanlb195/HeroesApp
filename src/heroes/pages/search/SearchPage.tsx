import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";


export const SearchPage = () => {
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
        </>
    )
}


export default SearchPage;