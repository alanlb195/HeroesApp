import { Link } from "react-router"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "../ui/breadcrumb"

interface Breadcrumb {
    label: string,
    to: string,
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {

    return (
        <>
            <Breadcrumb className="my-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Inicio</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {currentPage}
                        </BreadcrumbPage>
                    </BreadcrumbItem>

                    {
                        breadcrumbs.map(crumb => (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        <Link to={crumb.to}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </>
                        ))
                    }


                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}
