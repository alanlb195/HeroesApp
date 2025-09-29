import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.routes"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const HeroesApp = () => {

    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <RouterProvider router={appRouter} />
            </QueryClientProvider>
        </>
    )
}
