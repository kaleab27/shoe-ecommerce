"use client";

import { useProduct } from "@/hooks/useProduct";
import { useInventory } from "@/hooks/useInventory";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

export default function ProductDetail() {
    const params = useParams();
    const {
        data: product,
        isLoading: isProductLoading,
        error: productError,
    } = useProduct(params.slug as string);
    const {
        data: inventory,
        isLoading: isInventoryLoading,
        // error: inventoryError,
    } = useInventory(product?.id || "");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariations, setSelectedVariations] = useState<
        Record<string, string>
    >({});
    const { addToCart, removeItem, isInCart } = useCart();

    // Set default variations when inventory loads
    useEffect(() => {
        if (inventory?.variationsStock && product?.variations) {
            product.variations.forEach((variation) => {
                const options = getAvailableOptions(variation);
                if (options.length > 0) {
                    handleVariationChange(variation, options[0]);
                }
            });
        }
    }, [inventory?.variationsStock, product?.variations]);

    const isLoading = isProductLoading || isInventoryLoading;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (productError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">
                    Error loading product. Please try again later.
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Product not found.</div>
            </div>
        );
    }

    // Mock related products
    const relatedProducts = [
        {
            id: "2",
            name: "Milano Loafer",
            slug: "milano-loafer",
            price: 165,
            image: "/placeholder.svg?height=600&width=600",
        },
        {
            id: "3",
            name: "Urban Boot",
            slug: "urban-boot",
            price: 219,
            image: "/placeholder.svg?height=600&width=600",
        },
        {
            id: "4",
            name: "Classic Derby",
            slug: "classic-derby",
            price: 179,
            image: "/placeholder.svg?height=600&width=600",
        },
    ];

    // Get available options for each variation
    const getAvailableOptions = (variationType: string) => {
        if (!inventory?.variationsStock) return [];
        const options = new Set<string>();
        inventory.variationsStock.forEach((item) => {
            if (item[variationType]) {
                options.add(item[variationType] as string);
            }
        });
        return Array.from(options);
    };

    // Get current stock based on selected variations
    const getCurrentStock = () => {
        if (!inventory?.variationsStock) return 0;
        const matchingItem = inventory.variationsStock.find((item) => {
            return product.variations.every(
                (variation) => item[variation] === selectedVariations[variation]
            );
        });
        return matchingItem?.stock || 0;
    };

    const handleVariationChange = (variationType: string, value: string) => {
        setSelectedVariations((prev) => ({
            ...prev,
            [variationType]: value,
        }));
    };

    const handleAddToCart = () => {
        if (!product) return;

        // Check if all variations are selected
        const allVariationsSelected = product.variations.every(
            (variation) => selectedVariations[variation]
        );

        if (!allVariationsSelected) {
            toast.error("Please select all variations");
            return;
        }

        // Check if there's enough stock
        const currentStock = getCurrentStock();
        if (currentStock < quantity) {
            toast.error("Not enough stock available");
            return;
        }

        // Add to cart
        addToCart(product, selectedVariations, quantity);
        toast.success("Added to cart");
    };

    const handleRemoveFromCart = () => {
        if (!product) return;
        removeItem(product.id, selectedVariations);
        toast.success("Removed from cart");
    };

    const currentStock = getCurrentStock();
    const isProductInCart = isInCart(product.id, selectedVariations);

    return (
        <main className="min-h-screen py-16 px-4 md:px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square">
                        <Image
                            src={
                                product.images[selectedImage] ||
                                "/placeholder.svg"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden border-2 ${
                                        index === selectedImage
                                            ? "border-amber-800"
                                            : "border-transparent"
                                    }`}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <p className="text-2xl font-semibold text-amber-800">
                                ${product.discountedPrice || product.basePrice}
                            </p>
                            {product.discountedPrice &&
                                product.discountedPrice < product.basePrice && (
                                    <p className="text-lg text-gray-500 line-through">
                                        ${product.basePrice}
                                    </p>
                                )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            {currentStock > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">
                                Description
                            </h2>
                            <p className="text-gray-600">
                                {product.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">
                                Brand
                            </h2>
                            <p className="text-gray-600">{product.brand}</p>
                        </div>

                        {product.variations.length > 0 && (
                            <div className="space-y-4">
                                {product.variations.map((variation) => (
                                    <div key={variation}>
                                        <h2 className="text-lg font-semibold mb-2 capitalize">
                                            {variation}
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {getAvailableOptions(variation).map(
                                                (option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() =>
                                                            handleVariationChange(
                                                                variation,
                                                                option
                                                            )
                                                        }
                                                        className={`px-3 py-1 rounded-full text-sm border ${
                                                            selectedVariations[
                                                                variation
                                                            ] === option
                                                                ? "bg-amber-800 text-white border-amber-800"
                                                                : "bg-white text-gray-800 border-gray-300 hover:border-amber-800"
                                                        }`}
                                                    >
                                                        {option}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    setQuantity(Math.max(1, quantity - 1))
                                }
                                className="px-3"
                                disabled={currentStock === 0}
                            >
                                -
                            </Button>
                            <Input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            parseInt(e.target.value) || 1
                                        )
                                    )
                                }
                                className="w-16 text-center border-0"
                                min="1"
                                max={currentStock}
                                disabled={currentStock === 0}
                            />
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    setQuantity(
                                        Math.min(currentStock, quantity + 1)
                                    )
                                }
                                className="px-3"
                                disabled={currentStock === 0}
                            >
                                +
                            </Button>
                        </div>
                        <Button
                            className={`flex-1 ${
                                isProductInCart
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-amber-800 hover:bg-amber-700"
                            } text-white`}
                            disabled={currentStock === 0}
                            onClick={
                                isProductInCart
                                    ? handleRemoveFromCart
                                    : handleAddToCart
                            }
                        >
                            {currentStock === 0
                                ? "Out of Stock"
                                : isProductInCart
                                  ? "Remove from Cart"
                                  : "Add to Cart"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <section className="max-w-7xl mx-auto mt-16">
                <h2 className="text-2xl font-bold mb-8">You may also like</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((product) => (
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
                            <div>
                                <h3 className="font-medium text-lg">
                                    {product.name}
                                </h3>
                                <p className="text-muted-foreground">
                                    ${product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
