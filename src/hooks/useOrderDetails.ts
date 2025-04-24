import { useQuery } from "@tanstack/react-query";
import { getOrderDetails, OrderDetails } from "@/lib/services/order";

export function useOrderDetails(orderId: string) {
    return useQuery<OrderDetails>({
        queryKey: ["orderDetail", orderId],
        queryFn: () => {
            console.log("dataaa");
            return getOrderDetails(orderId);
        },
        enabled: !!orderId,
    });
}
