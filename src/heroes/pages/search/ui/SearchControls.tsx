import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react"
import { useRef } from "react"
import { useSearchParams } from "react-router"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion"


export const SearchControls = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const activeAccordion = searchParams.get('active-accordion') ?? '';
    const selectedStrength = Number(searchParams.get('strength') ?? 0)

    const setQueryParams = (name: string, value: string) => {
        setSearchParams((prev) => {
            prev.set(name, value);
            return prev;
        });
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const value = inputRef.current?.value ?? '';
            setQueryParams('name', value)
        }
    }

    return (
        <>
            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        ref={inputRef}
                        placeholder="Search heroes, villains, powers, teams..."
                        className="pl-12 h-12 text-lg bg-white"
                        onKeyDown={event => handleKeyDown(event)}
                        defaultValue={searchParams.get('name') ?? ''}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        variant={
                            activeAccordion === 'advanced-filters' ? "outline" : "outline"
                        }
                        className="h-12 bg-white"
                        onClick={() => {
                            if (activeAccordion === 'advanced-filters') {

                                // console.log('estan los filtros avanzados bro');

                                setQueryParams('active-accordion', '');

                                setSearchParams((prev) => {
                                    prev.delete('active-accordion')
                                    return prev;
                                })
                                return;
                            }
                            // console.log('no estan los filtros avanzados bro');

                            setQueryParams('active-accordion', 'advanced-filters');
                        }}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12 bg-white">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12 bg-white">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Character
                    </Button>
                </div>
            </div>

            <Accordion
                data-testid="accordion"
                type="single"
                collapsible
                className="w-full"
                value={activeAccordion}
            >
                <AccordionItem value="advanced-filters">
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        {/* Advanced Filters */}
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button variant="ghost">Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Team</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All teams
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All categories
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Universe</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All universes
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All statuses
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
                                <div className="relative flex w-full touch-none select-none items-center mt-2">
                                    <div className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors" />
                                    <Slider
                                        defaultValue={[selectedStrength]}
                                        onValueChange={(value) => {
                                            setQueryParams('strength', value[0].toString())
                                        }}
                                        min={0}
                                        max={10}
                                        step={1} />
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </>
    )
}
