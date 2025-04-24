"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Product } from "@/lib/mock-data";
import { ProductGrid } from "@/components/product/productGrid";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: products = [], isLoading, error } = useProducts();
    const productsPerPage = 8;

    // Calculate pagination values
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
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
            {/* Product Grid Section */}
            <section
                id="product-section"
                className="py-16 px-4 md:px-6 max-w-7xl mx-auto"
            >
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Our Collection</h2>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="text-sm text-muted-foreground">
                            Showing {indexOfFirstProduct + 1}-
                            {Math.min(indexOfLastProduct, totalProducts)} of{" "}
                            {totalProducts} products
                        </div>
                    </div>
                </div>

                <ProductGrid products={currentProducts} />

                <div className="mt-12 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>

            {/* Collection Grid */}
            {/* <section className="py-16 px-4 md:px-6  mx-auto bg-amber-50 dark:bg-amber-950">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    Explore Collections
                </h2>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        {
                            name: "Shoes",
                            image: "/placeholder.svg?height=600&width=450",
                        },
                        {
                            name: "Neckless",
                            image: "/placeholder.svg?height=600&width=450",
                        },
                        {
                            name: "Rings",
                            image: "/placeholder.svg?height=600&width=450",
                        },
                        {
                            name: "T-Shirts",
                            image: "/placeholder.svg?height=600&width=450",
                        },
                        {
                            name: "Dress Shoes",
                            image: "/placeholder.svg?height=600&width=450",
                        },
                        {
                            name: "Eye Glasses",
                            image: "/placeholder.svg?height=600&width=450",
                        },
                    ].map((collection, index) => (
                        <Link
                            href={`/search?category=${collection.name.toLowerCase()}`}
                            key={index}
                            className="relative aspect-[3/4] bg-amber-50 overflow-hidden group"
                        >
                            <Image
                                src={collection.image || "/placeholder.svg"}
                                alt={`${collection.name} collection`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                                <h3 className="text-white font-medium text-lg">
                                    {collection.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section> */}

            {/* Newsletter */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
                        <Image
                            src="/placeholder.svg?height=600&width=600"
                            alt="Stylish men's shoes"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            Stay in the loop.
                        </h2>
                        <p className="text-lg mb-8">
                            Be the first to know about new collections,
                            exclusive offers, and style tips.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/10 border-white/20 text-white rounded-none"
                            />
                            <Button className="bg-amber-800 hover:bg-amber-700 text-white rounded-none">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
