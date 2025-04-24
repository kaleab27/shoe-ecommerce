"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";
import { ProductGrid } from "@/components/product/productGrid";
import { useProducts } from "@/hooks/useProducts";
import { categories } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function CategoryPage() {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: products = [], isLoading, error } = useProducts();
    const productsPerPage = 8;

    // Find the current category
    const category = categories.find((cat) => cat.slug === params.slug);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">Category not found</div>
            </div>
        );
    }

    // Filter products by category
    const categoryProducts = products.filter(
        (product) => product.categoryId === category.id
    );

    // Calculate pagination values
    const totalProducts = categoryProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = categoryProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">
                    Error loading products. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen">
            <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">{category.name}</h2>
                        {category.description && (
                            <p className="text-muted-foreground mt-2">
                                {category.description}
                            </p>
                        )}
                    </div>
                    {totalProducts > 0 && (
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className="text-sm text-muted-foreground">
                                Showing {indexOfFirstProduct + 1}-
                                {Math.min(indexOfLastProduct, totalProducts)} of{" "}
                                {totalProducts} products
                            </div>
                        </div>
                    )}
                </div>

                {totalProducts === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">
                            No products found
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            We couldn&apos;t find any products in this category at
                            the moment. Please check back later or explore our
                            other categories.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {categories
                                .filter((cat) => cat.id !== category.id)
                                .slice(0, 3)
                                .map((suggestedCategory) => (
                                    <Button
                                        key={suggestedCategory.id}
                                        variant="outline"
                                        asChild
                                    >
                                        <Link
                                            href={`/category/${suggestedCategory.slug}`}
                                        >
                                            {suggestedCategory.name}
                                        </Link>
                                    </Button>
                                ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <ProductGrid products={currentProducts} />
                        <div className="mt-12 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
