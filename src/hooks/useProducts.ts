import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/services/products";
import { Product } from "@/lib/mock-data";

export function useProducts() {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts,
    });
}
