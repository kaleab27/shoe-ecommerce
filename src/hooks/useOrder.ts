import { placeOrder } from "@/lib/services/order";
import { useMutation } from "@tanstack/react-query";


export function useOrder() {
    return useMutation({
        mutationFn: placeOrder,
    });
}
