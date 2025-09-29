import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
import type { JSX } from 'react';

interface Props {
    title: string;
    icon: JSX.Element // React.ReactNode
    children: React.ReactNode,
}

export const HeroStatCard = ({ title, icon, children }: Props) => {
    return (
        <>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </>
    )
}
