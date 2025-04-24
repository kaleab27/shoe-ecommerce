"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/hooks/useGetOrder";
import { useOrderDetails } from "@/hooks/useOrderDetails";
import { OrderItem } from "@/lib/types";

export default function OrderConfirmationPage() {
    const params = useParams();
    const { data: orderDetails } = useOrderDetails(params.id as string);
    const { data: order, isLoading, error } = useGetOrder(params.id as string);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-medium mb-4">
                        Order not found
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        We couldn&apos;t find the order you&apos;re looking for.
                    </p>
                    <Button
                        asChild
                        className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-6 text-lg rounded-none"
                    >
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const orderItems = order as unknown as OrderItem[];

    return (
        <main className="container mx-auto px-4 py-10">
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-sm text-amber-800 hover:text-amber-900 dark:text-amber-400 hover:underline flex items-center"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Return to Home
                </Link>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your order has been
                        received.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
                                Order Details
                            </h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                        Order ID:
                                    </span>{" "}
                                    <span className="dark:text-gray-200">
                                        {orderDetails?.id}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                        Date:
                                    </span>{" "}
                                    <span className="dark:text-gray-200">
                                        {new Date(
                                            orderDetails?.createdAt || ""
                                        ).toLocaleDateString()}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                        Status:
                                    </span>{" "}
                                    <span className="capitalize dark:text-gray-200">
                                        {orderDetails?.status}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                        Payment Status:
                                    </span>{" "}
                                    <span className="capitalize dark:text-gray-200">
                                        {orderDetails?.paymentStatus}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
                                Shipping Information
                            </h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                        Phone:
                                    </span>{" "}
                                    <span className="dark:text-gray-200">
                                        {orderDetails?.phoneNumber}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                        Address:
                                    </span>{" "}
                                    <span className="dark:text-gray-200">
                                        {orderDetails?.shippingAddress}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
                        Order Items
                    </h2>
                    <div className="space-y-4">
                        {orderItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h3 className="font-medium dark:text-gray-100">
                                        Product ID: {item.productId}
                                    </h3>
                                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                                        {Object.entries(item.variation).map(
                                            ([key, value]) => (
                                                <span
                                                    key={key}
                                                    className="capitalize"
                                                >
                                                    {key}: {value}{" "}
                                                </span>
                                            )
                                        )}
                                    </div>
                                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                                        Quantity: {item.quantity}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium dark:text-gray-100">
                                        ${item.totalPrice}
                                    </div>
                                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                                        ${item.price} each
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
                        Order Summary
                    </h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground dark:text-gray-400">
                                Subtotal
                            </span>
                            <span className="dark:text-gray-200">
                                $
                                {orderItems
                                    .reduce(
                                        (total, item) =>
                                            total + parseFloat(item.totalPrice),
                                        0
                                    )
                                    .toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground dark:text-gray-400">
                                Shipping
                            </span>
                            <span className="dark:text-gray-200">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-800">
                            <span className="dark:text-gray-100">Total</span>
                            <span className="dark:text-gray-100">
                                $
                                {orderItems
                                    .reduce(
                                        (total, item) =>
                                            total + parseFloat(item.totalPrice),
                                        0
                                    )
                                    .toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
