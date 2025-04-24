"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export default function CartButton() {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
                <span className="sr-only">Cart with {itemCount} items</span>
            </Link>
        </Button>
    );
}
