import { Order } from "@/lib/types";

interface OrderItem {
    productId: string;
    quantity: number;
    variation: Record<string, string>;
    price: number;
    totalPrice: number;
}

interface OrderRequest {
    order: Order;
    orderItems: OrderItem[];
}

export type OrderDetails = Order;

export async function placeOrder(data: OrderRequest) {
    const response = await fetch("/api/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create order");
    }

    return response.json();
}

export async function getOrderDetails(orderId: string): Promise<OrderDetails> {
    const response = await fetch(`/api/orders/${orderId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch order details");
    }
    const data = await response.json();
    return data[0];
}
