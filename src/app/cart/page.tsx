"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCart, CartItem } from "@/hooks/useCart";

// Helper function to safely get price
const getPrice = (item: CartItem) => {
    const price = item.product.discountedPrice || item.product.basePrice;
    return parseFloat(`${price}`);
};

// Helper function to format price
const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
};

// Mock recently viewed data
const recentlyViewed = [
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
    {
        id: "5",
        name: "Casual Sneaker",
        slug: "casual-sneaker",
        price: 149,
        image: "/placeholder.svg?height=600&width=600",
    },
];

export default function CartPage() {
    const { cartItems, updateQuantity, removeItem, isInitialized } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("standard");

    const subtotal = cartItems.reduce(
        (total, item) => total + getPrice(item) * item.quantity,
        0
    );
    const shipping = shippingMethod === "express" ? 15 : 0;
    const tax = subtotal * 0.15; // 15% tax rate
    const total = subtotal + shipping + tax;

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-10">
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-sm text-amber-800 hover:underline flex items-center"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Continue shopping
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-medium mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Looks like you haven&apos;t added anything to your cart
                        yet.
                    </p>
                    <Button
                        asChild
                        className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-6 text-lg rounded-none"
                    >
                        <Link href="/">Start Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <div className="hidden md:grid grid-cols-6 gap-4 mb-4 text-sm font-medium text-muted-foreground">
                            <div className="col-span-3">Product</div>
                            <div className="text-left">Price</div>
                            <div className="text-left">Quantity</div>
                            <div className="text-right">Total</div>
                        </div>

                        <Separator className="mb-6" />

                        {cartItems.map((item) => (
                            <div
                                key={`${item.product.id}-${Object.values(item.selectedVariations).join("-")}`}
                                className="mb-6"
                            >
                                <div className="grid md:grid-cols-6 gap-4 items-center justify-start">
                                    <div className="md:col-span-3">
                                        <div className="flex gap-4">
                                            <div className="relative aspect-square w-20 h-20 flex-shrink-0 bg-amber-50">
                                                <Image
                                                    src={
                                                        item.product
                                                            .images[0] ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <Link
                                                    href={`/product/${item.product.id}`}
                                                    className="font-medium hover:text-amber-800"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {Object.entries(
                                                        item.selectedVariations
                                                    ).map(([key, value]) => (
                                                        <div
                                                            key={key}
                                                            className="capitalize"
                                                        >
                                                            {key}: {value}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="md:hidden text-sm text-muted-foreground mb-1">
                                            Price:
                                        </div>
                                        {formatPrice(getPrice(item))}
                                    </div>

                                    <div className="flex items-center md:justify-left">
                                        <div className="md:hidden text-sm text-muted-foreground mr-2">
                                            Quantity:
                                        </div>
                                        <div className="flex items-left border rounded-md">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.selectedVariations,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="px-2 py-1 text-muted-foreground hover:text-foreground"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.selectedVariations,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="px-2 py-1 text-muted-foreground hover:text-foreground"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="md:hidden text-sm text-muted-foreground">
                                                Total:
                                            </div>
                                            {formatPrice(
                                                getPrice(item) * item.quantity
                                            )}
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeItem(
                                                    item.product.id,
                                                    item.selectedVariations
                                                )
                                            }
                                            className="text-sm text-red-600 hover:text-red-800 flex items-center md:justify-end mt-2"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <Separator className="my-6" />
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="p-6 border">
                            <h2 className="text-xl font-bold mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Shipping
                                    </span>
                                    <span>
                                        {shipping === 0
                                            ? "Free"
                                            : formatPrice(shipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Tax
                                    </span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="space-y-2">
                                    <Label htmlFor="shipping">
                                        Shipping Method
                                    </Label>
                                    <Select
                                        value={shippingMethod}
                                        onValueChange={setShippingMethod}
                                    >
                                        <SelectTrigger id="shipping">
                                            <SelectValue placeholder="Select shipping method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">
                                                Standard Shipping (Free)
                                            </SelectItem>
                                            <SelectItem value="express">
                                                Express Shipping ($15.00)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="promo">Promo Code</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="promo"
                                            value={promoCode}
                                            onChange={(e) =>
                                                setPromoCode(e.target.value)
                                            }
                                            placeholder="Enter promo code"
                                        />
                                        <Button
                                            variant="outline"
                                            className="shrink-0"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white py-6 text-lg rounded-none">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {cartItems.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-8">Recently Viewed</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {recentlyViewed.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                className="group"
                            >
                                <div className="relative aspect-square mb-4 bg-amber-50 overflow-hidden">
                                    <Image
                                        src={
                                            product.image || "/placeholder.svg"
                                        }
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
            )}
        </main>
    );
}
