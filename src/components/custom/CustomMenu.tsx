import { Link, useLocation } from "react-router"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink
} from "../ui/navigation-menu"
import { cn } from "@/lib/utils";



export const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return pathname === path;
    }

    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(isActive('/') && "bg-slate-200", 'p-2 rounded-md')}
                        >
                            <Link to={"/"}>Inicio</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(isActive('/search') && "bg-slate-200", 'p-2 rounded-md')}
                        >
                            <Link to={"/search"}>Buscar superheroes</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
