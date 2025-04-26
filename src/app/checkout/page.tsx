"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useOrder } from "@/hooks/useOrder";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AuthButtons } from "@/components/auth/authButton";

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, clearCart, isInitialized } = useCart();
    const { mutate: placeOrder, isPending } = useOrder();
    const { data: user, isLoading: isUserLoading } = useUser();
    const [formData, setFormData] = useState({
        phoneNumber: "",
        shippingAddress: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    if (!isInitialized || isUserLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-medium mb-4">
                        Please log in to continue
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        You need to be logged in to place an order.
                    </p>
                    <div className="flex justify-center">
                        <AuthButtons
                            isLoggedInStatus={isLoggedIn}
                            setLoggedInStatus={setIsLoggedIn}
                            redirectURL="/checkout"
                        />
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = cartItems.reduce(
        (total, item) =>
            total +
            (item.product.discountedPrice || item.product.basePrice) *
                item.quantity,
        0
    );
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.15; // 15% tax rate
    const total = subtotal + shipping + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        placeOrder(
            {
                order: {
                    userId: `${user.id}`,
                    phoneNumber: formData.phoneNumber,
                    shippingAddress: formData.shippingAddress,
                    totalAmount: total,
                    status: "Pending",
                    paymentStatus: "Incomplete",
                },
                orderItems: cartItems.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    variation: item.selectedVariations,
                    price:
                        item.product.discountedPrice || item.product.basePrice,
                    totalPrice:
                        (item.product.discountedPrice ||
                            item.product.basePrice) * item.quantity,
                })),
            },
            {
                onSuccess: (data) => {
                    // Clear cart after successful order
                    clearCart();

                    // Show success message
                    toast.success("Order placed successfully!");

                    // Redirect to order confirmation page
                    router.push(
                        `/order-confirmation/${data.orderItems[0].orderId}`
                    );
                },
                onError: (error) => {
                    console.error("Error creating order:", error);
                    toast.error("Failed to place order. Please try again.");
                },
            }
        );
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <main className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="phoneNumber">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <Label htmlFor="shippingAddress">
                                    Shipping Address
                                </Label>
                                <Textarea
                                    id="shippingAddress"
                                    name="shippingAddress"
                                    value={formData.shippingAddress}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your shipping address"
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-amber-800 hover:bg-amber-900 text-white py-6 text-lg rounded-none"
                            disabled={isPending || cartItems.length === 0}
                        >
                            {isPending ? "Processing..." : "Place Order"}
                        </Button>
                    </form>
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
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold">Items in Cart</h3>
                            <div className="space-y-2">
                                {cartItems.map((item) => (
                                    <div
                                        key={`${item.product.id}-${Object.values(item.selectedVariations).join("-")}`}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {item.product.name} x{" "}
                                            {item.quantity}
                                        </span>
                                        <span>
                                            $
                                            {(
                                                (item.product.discountedPrice ||
                                                    item.product.basePrice) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
