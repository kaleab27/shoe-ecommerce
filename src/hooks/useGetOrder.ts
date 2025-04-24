import { useQuery } from "@tanstack/react-query";
import { Order } from "@/lib/types";

export async function getOrder(orderId: string): Promise<Order> {
    const response = await fetch(`/api/order/${orderId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch order");
    }
    return response.json();
}

export function useGetOrder(orderId: string) {
    return useQuery<Order>({
        queryKey: ["order", orderId],
        queryFn: () => getOrder(orderId),
        enabled: !!orderId,
    });
}
