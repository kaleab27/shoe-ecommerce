"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/search/searchBar";
import { SearchFilters } from "@/components/search/searchFilters";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/lib/types";

interface SearchResultsProps {
    initialQuery: string;
}

export function SearchResults({ initialQuery }: SearchResultsProps) {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(initialQuery);
    const [sortOption, setSortOption] = useState("relevance");
    const [filters, setFilters] = useState({
        categories: [] as string[],
        priceRange: { min: 0, max: 1000 },
    });

    const { data: products, isLoading, error } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    // Update query when URL parameters change
    useEffect(() => {
        const searchQuery = searchParams.get("q");
        setQuery(searchQuery || "");
    }, [searchParams]);

    useEffect(() => {
        if (!products) return;

        let results = [...products];

        // Only apply search filter if there's a query
        const searchQuery = searchParams.get("q");
        if (searchQuery) {
            const searchTerms = searchQuery.toLowerCase().split(" ");
            results = results.filter((product) => {
                const productText =
                    `${product.name} ${product.brand}`.toLowerCase();
                return searchTerms.every((term) => productText.includes(term));
            });
        }

        // Apply category filters
        if (filters.categories.length > 0) {
            results = results.filter((product) =>
                filters.categories.includes(product.categoryId)
            );
        }

        // Apply price range filter
        results = results.filter(
            (product) =>
                product.basePrice >= filters.priceRange.min &&
                product.basePrice <= filters.priceRange.max
        );

        // Sort results
        switch (sortOption) {
            case "price-low":
                results.sort((a, b) => a.basePrice - b.basePrice);
                break;
            case "price-high":
                results.sort((a, b) => b.basePrice - a.basePrice);
                break;
            case "name":
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(results);
    }, [searchParams, filters, sortOption, products]);

    const updateFilters = (newFilters: Partial<typeof filters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    if (isLoading) {
        return (
            <div className="container px-4 mx-auto py-8">
                <div className="text-center py-16">
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container px-4 mx-auto py-8">
                <div className="text-center py-16">
                    <p className="text-red-500">
                        Error loading products. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    const searchQuery = searchParams.get("q");

    return (
        <div className="container px-4 mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Search</h1>
                <SearchBar variant="page" initialQuery={query} />
            </div>

            {searchQuery && (
                <p className="text-muted-foreground mb-6">
                    {filteredProducts.length} results for &quot;{searchQuery}
                    &quot;
                </p>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                <div className="hidden md:block w-64 flex-shrink-0">
                    <SearchFilters
                        filters={filters}
                        updateFilters={updateFilters}
                    />
                </div>

                <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="md:hidden">
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[300px] sm:w-[350px]"
                            >
                                <SearchFilters
                                    filters={filters}
                                    updateFilters={updateFilters}
                                />
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center ml-auto">
                            <span className="text-sm text-muted-foreground mr-2">
                                Sort by:
                            </span>
                            <Select
                                value={sortOption}
                                onValueChange={setSortOption}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">
                                        Relevance
                                    </SelectItem>
                                    <SelectItem value="price-low">
                                        Price: Low to High
                                    </SelectItem>
                                    <SelectItem value="price-high">
                                        Price: High to Low
                                    </SelectItem>
                                    <SelectItem value="name">Name</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16 border rounded-md">
                            <h2 className="text-2xl font-medium mb-2">
                                No results found
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Try adjusting your search or filters to find
                                what you&apos;re looking for.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setQuery("");
                                    setFilters({
                                        categories: [],
                                        priceRange: { min: 0, max: 1000 },
                                    });
                                }}
                            >
                                Clear all filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="group"
                                >
                                    <div className="relative aspect-square mb-4 bg-amber-50 overflow-hidden">
                                        <Image
                                            src={
                                                product.images[0] ||
                                                "/placeholder.svg"
                                            }
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-lg">
                                                {product.name}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                ${product.basePrice}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {product.brand}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full h-8 w-8 p-0 border-amber-800"
                                        >
                                            <ChevronRight className="h-4 w-4 text-amber-800" />
                                            <span className="sr-only">
                                                View details
                                            </span>
                                        </Button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
