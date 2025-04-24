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

export async function getProductById(id: string): Promise<Product> {
    try {
        const response = await fetch(`/api/product/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const result = await response.json();
        console.log("result");
        console.log(result.data[0]);
        return result.data[0];
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}
