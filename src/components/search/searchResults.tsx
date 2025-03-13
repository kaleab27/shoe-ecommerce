"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

// Mock product data
const allProducts = [
  {
    id: "1",
    name: "Oxford Classic",
    slug: "oxford-classic",
    price: 189,
    color: "Brown",
    category: "Oxfords",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "2",
    name: "Milano Loafer",
    slug: "milano-loafer",
    price: 165,
    color: "Tan",
    category: "Loafers",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "3",
    name: "Urban Boot",
    slug: "urban-boot",
    price: 219,
    color: "Black",
    category: "Boots",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "4",
    name: "Classic Derby",
    slug: "classic-derby",
    price: 179,
    color: "Black",
    category: "Oxfords",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "5",
    name: "Casual Sneaker",
    slug: "casual-sneaker",
    price: 149,
    color: "White",
    category: "Sneakers",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "6",
    name: "Penny Loafer",
    slug: "penny-loafer",
    price: 175,
    color: "Brown",
    category: "Loafers",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "7",
    name: "Chelsea Boot",
    slug: "chelsea-boot",
    price: 229,
    color: "Brown",
    category: "Boots",
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "8",
    name: "Wingtip Oxford",
    slug: "wingtip-oxford",
    price: 199,
    color: "Tan",
    category: "Oxfords",
    image: "/placeholder.svg?height=600&width=600",
  },
];

interface SearchResultsProps {
  initialQuery: string;
}

export function SearchResults({ initialQuery }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [sortOption, setSortOption] = useState("relevance");
  const [filters, setFilters] = useState({
    categories: [] as string[],
    colors: [] as string[],
    priceRange: { min: 0, max: 300 },
  });

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url.toString());
  }, [query]);

  useEffect(() => {
    let results = [...allProducts];

    // Filter by search query
    if (query) {
      const searchTerms = query.toLowerCase().split(" ");
      results = results.filter((product) => {
        const productText =
          `${product.name} ${product.category} ${product.color}`.toLowerCase();
        return searchTerms.every((term) => productText.includes(term));
      });
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      results = results.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Apply color filters
    if (filters.colors.length > 0) {
      results = results.filter((product) =>
        filters.colors.includes(product.color)
      );
    }

    // Apply price range filter
    results = results.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // Sort results
    switch (sortOption) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      // For relevance, we keep the original order or could implement a more complex relevance algorithm
      default:
        break;
    }

    setFilteredProducts(results);
  }, [query, filters, sortOption]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container px-4 mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <SearchBar variant="page" initialQuery={query} />
      </div>

      {query && (
        <p className="text-muted-foreground mb-6">
          {filteredProducts.length} results for &quot;{query}&quot;
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden md:block w-64 flex-shrink-0">
          <SearchFilters filters={filters} updateFilters={updateFilters} />
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
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
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
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 border rounded-md">
              <h2 className="text-2xl font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setFilters({
                    categories: [],
                    colors: [],
                    priceRange: { min: 0, max: 300 },
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
                  href={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-square mb-4 bg-amber-50 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-muted-foreground">${product.price}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.color}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0 border-amber-800"
                    >
                      <ChevronRight className="h-4 w-4 text-amber-800" />
                      <span className="sr-only">View details</span>
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
