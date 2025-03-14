import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping Cart | NOBLEMAN",
    description: "View and manage the items in your shopping cart.",
};

export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
