import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext"


export const HeroesApp = () => {

    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>

                <FavoriteHeroProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <RouterProvider router={appRouter} />
                </FavoriteHeroProvider>

            </QueryClientProvider>
        </>
    )
}
