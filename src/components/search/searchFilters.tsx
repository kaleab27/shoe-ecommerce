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

interface FiltersProps {
  filters: {
    categories: string[];
    colors: string[];
    priceRange: { min: number; max: number };
  };
  updateFilters: (filters: Partial<FiltersProps["filters"]>) => void;
}

export function SearchFilters({ filters, updateFilters }: FiltersProps) {
  const categories = ["Oxfords", "Loafers", "Boots", "Sneakers"];
  const colors = ["Black", "Brown", "Tan", "White"];

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    updateFilters({ categories: newCategories });
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];

    updateFilters({ colors: newColors });
  };

  const handlePriceChange = (value: number[]) => {
    updateFilters({
      priceRange: { min: value[0], max: value[1] },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Filters</h2>
        <Button
          variant="link"
          className="px-0 text-amber-800 h-auto"
          onClick={() =>
            updateFilters({
              categories: [],
              colors: [],
              priceRange: { min: 0, max: 300 },
            })
          }
        >
          Clear all
        </Button>
      </div>

      <Separator />

      <Accordion
        type="multiple"
        defaultValue={["categories", "colors", "price"]}
      >
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => toggleColor(color)}
                  />
                  <Label
                    htmlFor={`color-${color}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {color}
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
                defaultValue={[filters.priceRange.min, filters.priceRange.max]}
                max={300}
                step={10}
                onValueChange={handlePriceChange}
                className="mt-6"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${filters.priceRange.min}</span>
                <span className="text-sm">${filters.priceRange.max}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
