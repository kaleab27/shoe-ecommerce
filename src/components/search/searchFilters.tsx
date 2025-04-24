"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { categories } from "@/lib/categories";

interface FiltersProps {
    filters: {
        categories: string[];
        priceRange: { min: number; max: number };
    };
    updateFilters: (filters: Partial<FiltersProps["filters"]>) => void;
}

export function SearchFilters({ filters, updateFilters }: FiltersProps) {
    const toggleCategory = (categoryId: string) => {
        const newCategories = filters.categories.includes(categoryId)
            ? filters.categories.filter((c) => c !== categoryId)
            : [...filters.categories, categoryId];

        updateFilters({ categories: newCategories });
    };

    const handlePriceChange = (value: number[]) => {
        updateFilters({
            priceRange: { min: value[0], max: value[1] },
        });
    };

    return (
        <div className="space-y-6 p-8">
            <div>
                <h2 className="text-lg font-medium mb-4">Filters</h2>
                <Button
                    variant="link"
                    className="px-0 text-amber-800 h-auto"
                    onClick={() =>
                        updateFilters({
                            categories: [],
                            priceRange: { min: 0, max: 1000 },
                        })
                    }
                >
                    Clear all
                </Button>
            </div>

            <Separator />

            <Accordion type="multiple" defaultValue={["categories", "price"]}>
                <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`category-${category.id}`}
                                        checked={filters.categories.includes(
                                            category.id
                                        )}
                                        onCheckedChange={() =>
                                            toggleCategory(category.id)
                                        }
                                    />
                                    <Label
                                        htmlFor={`category-${category.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {category.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <Slider
                                defaultValue={[
                                    filters.priceRange.min,
                                    filters.priceRange.max,
                                ]}
                                max={1000}
                                step={10}
                                onValueChange={handlePriceChange}
                                className="mt-6"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-sm">
                                    ${filters.priceRange.min}
                                </span>
                                <span className="text-sm">
                                    ${filters.priceRange.max}
                                </span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
