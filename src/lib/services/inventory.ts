import { Inventory } from "@/lib/types";

export async function getProductInventory(
    productId: string
): Promise<Inventory> {
    try {
        const response = await fetch(`/api/inventory/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch inventory");
        }

        const result = await response.json();
        console.log("inventory");
        console.log(result[0]);
        return result[0];
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
}
