import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export function AccountOrders() {
    // Mock order data
    const orders = [
        {
            id: "ORD-12345",
            date: "March 5, 2025",
            status: "Delivered",
            total: 354.0,
            items: [
                {
                    id: "1",
                    name: "Oxford Classic",
                    color: "Brown",
                    size: 9,
                    price: 189,
                    image: "/placeholder.svg?height=80&width=80",
                },
                {
                    id: "2",
                    name: "Milano Loafer",
                    color: "Tan",
                    size: 10,
                    price: 165,
                    image: "/placeholder.svg?height=80&width=80",
                },
            ],
        },
        {
            id: "ORD-12344",
            date: "February 18, 2025",
            status: "Delivered",
            total: 219.0,
            items: [
                {
                    id: "3",
                    name: "Urban Boot",
                    color: "Black",
                    size: 9.5,
                    price: 219,
                    image: "/placeholder.svg?height=80&width=80",
                },
            ],
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Order History</h2>
                <p className="text-muted-foreground">
                    View and track your orders
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">
                        When you place an order, it will appear here.
                    </p>
                    <Button
                        asChild
                        className="bg-amber-800 hover:bg-amber-900 text-white"
                    >
                        <Link href="/">Start Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border rounded-md overflow-hidden"
                        >
                            <div className="p-4 flex flex-wrap gap-4 justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">
                                            Order {order.id}
                                        </h3>
                                        <Badge
                                            variant={
                                                order.status === "Delivered"
                                                    ? "outline"
                                                    : "default"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Placed on {order.date}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="font-medium">
                                            ${order.total.toFixed(2)}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {order.items.length}{" "}
                                            {order.items.length === 1
                                                ? "item"
                                                : "items"}
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link
                                            href={`/account/orders/${order.id}`}
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                            <span className="sr-only">
                                                View order details
                                            </span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex flex-wrap gap-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="relative h-16 w-16 bg-gray-100">
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
                                                <div className="font-medium">
                                                    {item.name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {item.color}, Size{" "}
                                                    {item.size}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link
                                            href={`/account/orders/${order.id}`}
                                        >
                                            View Order Details
                                        </Link>
                                    </Button>
                                    {order.status === "Delivered" && (
                                        <Button variant="outline" size="sm">
                                            Buy Again
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
