import { useQuery } from "@tanstack/react-query";
import { getProductInventory } from "@/lib/services/inventory";
import { Inventory } from "@/lib/types";

export function useInventory(productId: string) {
    return useQuery<Inventory>({
        queryKey: ["inventory", productId],
        queryFn: () => getProductInventory(productId),
        enabled: !!productId,
    });
}
