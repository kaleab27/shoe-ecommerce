"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductPage({ params }: { params: { slug: string } }) {
    console.log(params);
    const [mainImage, setMainImage] = useState(0);

    // Mock product data
    const product = {
        id: "1",
        name: "Oxford Classic",
        slug: "oxford-classic",
        price: 189,
        description:
            "Handcrafted with premium full-grain leather, our Oxford Classic is the epitome of timeless elegance. The sleek silhouette and meticulous stitching make this shoe a versatile addition to any gentleman's wardrobe.",
        features: [
            "Full-grain leather upper",
            "Leather lining for comfort and breathability",
            "Goodyear welted construction for durability",
            "Leather sole with rubber heel for grip",
            "Cushioned insole for all-day comfort",
        ],
        care: "Wipe with a damp cloth to remove dirt. Apply leather conditioner and polish regularly. Use shoe trees when not wearing to maintain shape.",
        images: [
            "/placeholder.svg?height=800&width=800",
            "/placeholder.svg?height=800&width=800",
            "/placeholder.svg?height=800&width=800",
            "/placeholder.svg?height=800&width=800",
        ],
        colors: ["Brown", "Black", "Tan"],
        sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
        rating: 4.8,
        reviews: 124,
    };

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

    const nextImage = () => {
        setMainImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setMainImage(
            (prev) => (prev - 1 + product.images.length) % product.images.length
        );
    };

    return (
        <main className="container py-10">
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-sm text-amber-800 hover:underline flex items-center"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to collection
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square bg-amber-50 overflow-hidden">
                        <Image
                            src={
                                product.images[mainImage] || "/placeholder.svg"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-white/80 hover:bg-white"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="h-5 w-5" />
                                <span className="sr-only">Previous image</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-white/80 hover:bg-white"
                                onClick={nextImage}
                            >
                                <ChevronRight className="h-5 w-5" />
                                <span className="sr-only">Next image</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-auto pb-2">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden border-2 ${
                                    index === mainImage
                                        ? "border-amber-800"
                                        : "border-transparent"
                                }`}
                                onClick={() => setMainImage(index)}
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
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < Math.floor(product.rating)
                                                ? "fill-amber-400 text-amber-400"
                                                : "fill-gray-200 text-gray-200"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>
                    </div>

                    <div className="text-2xl font-bold">${product.price}</div>

                    <p className="text-muted-foreground">
                        {product.description}
                    </p>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Color</h3>
                            <RadioGroup
                                defaultValue={product.colors[0]}
                                className="flex gap-2"
                            >
                                {product.colors.map((color) => (
                                    <div
                                        key={color}
                                        className="flex items-center"
                                    >
                                        <RadioGroupItem
                                            value={color}
                                            id={`color-${color.toLowerCase()}`}
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor={`color-${color.toLowerCase()}`}
                                            className="rounded-md border border-muted px-3 py-2 hover:border-amber-800 peer-data-[state=checked]:border-amber-800 peer-data-[state=checked]:bg-amber-50"
                                        >
                                            {color}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Size</h3>
                            <RadioGroup
                                defaultValue={String(product.sizes[4])}
                                className="flex flex-wrap gap-2"
                            >
                                {product.sizes.map((size) => (
                                    <div
                                        key={size}
                                        className="flex items-center"
                                    >
                                        <RadioGroupItem
                                            value={String(size)}
                                            id={`size-${size}`}
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor={`size-${size}`}
                                            className="rounded-md border border-muted px-3 py-2 hover:border-amber-800 peer-data-[state=checked]:border-amber-800 peer-data-[state=checked]:bg-amber-50"
                                        >
                                            {size}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-6 text-lg rounded-none">
                            Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            className="border-amber-800 text-amber-800 hover:bg-amber-50 px-8 py-6 text-lg rounded-none"
                        >
                            <Heart className="mr-2 h-5 w-5" />
                            Add to Wishlist
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                        <Truck className="h-4 w-4" />
                        <span>Free shipping on orders over $200</span>
                    </div>

                    <Separator className="my-6" />

                    <Tabs defaultValue="details">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="care">Care</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="pt-4">
                            <p className="text-muted-foreground">
                                {product.description}
                            </p>
                            <p className="text-muted-foreground mt-4">
                                The Oxford Classic is a timeless dress shoe that
                                has been a staple in men&apos;s fashion for
                                centuries. Our version combines traditional
                                craftsmanship with modern comfort features to
                                create a shoe that looks as good as it feels.
                            </p>
                        </TabsContent>
                        <TabsContent value="features" className="pt-4">
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </TabsContent>
                        <TabsContent value="care" className="pt-4">
                            <p className="text-muted-foreground">
                                {product.care}
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Related Products */}
            <section className="mt-16">
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
