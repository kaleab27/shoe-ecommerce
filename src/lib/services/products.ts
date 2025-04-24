import { Product } from "@/lib/mock-data";

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch("/api/product", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}
