import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/services/products";
import { Product } from "@/lib/mock-data";

export function useProduct(id: string) {
    return useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id, // Only run the query if we have an ID
    });
}
