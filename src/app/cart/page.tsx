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

// Mock cart data
const initialCartItems = [
    {
        id: "1",
        name: "Oxford Classic",
        slug: "oxford-classic",
        price: 189,
        color: "Brown",
        size: 9,
        quantity: 1,
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "2",
        name: "Milano Loafer",
        slug: "milano-loafer",
        price: 165,
        color: "Tan",
        size: 10,
        quantity: 1,
        image: "/placeholder.svg?height=600&width=600",
    },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [promoCode, setPromoCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("standard");

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const shipping = shippingMethod === "express" ? 15 : 0;
    const tax = subtotal * 0.15; // 15% tax rate
    const total = subtotal + shipping + tax;

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

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

    return (
        <main className="container mx-auto py-10">
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
                            <div className="text-center">Price</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-right">Total</div>
                        </div>

                        <Separator className="mb-6" />

                        {cartItems.map((item) => (
                            <div key={item.id} className="mb-6">
                                <div className="grid md:grid-cols-6 gap-4 items-center">
                                    <div className="md:col-span-3">
                                        <div className="flex gap-4">
                                            <div className="relative aspect-square w-20 h-20 flex-shrink-0 bg-amber-50">
                                                <Image
                                                    src={
                                                        item.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <Link
                                                    href={`/product/${item.slug}`}
                                                    className="font-medium hover:text-amber-800"
                                                >
                                                    {item.name}
                                                </Link>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    <div>
                                                        Color: {item.color}
                                                    </div>
                                                    <div>Size: {item.size}</div>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-sm text-red-600 hover:text-red-800 flex items-center mt-2 md:hidden"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center md:text-center">
                                        <div className="md:hidden text-sm text-muted-foreground mb-1">
                                            Price
                                        </div>
                                        ${item.price.toFixed(2)}
                                    </div>

                                    <div className="flex items-center md:justify-center">
                                        <div className="md:hidden text-sm text-muted-foreground mr-2">
                                            Quantity
                                        </div>
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
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
                                                        item.id,
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

                                    <div className="text-right">
                                        <div className="md:hidden text-sm text-muted-foreground mb-1">
                                            Total
                                        </div>
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-sm text-red-600 hover:text-red-800 hidden md:flex items-center justify-end mt-2"
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
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Shipping
                                    </span>
                                    <span>
                                        {shipping === 0
                                            ? "Free"
                                            : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Tax
                                    </span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
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
