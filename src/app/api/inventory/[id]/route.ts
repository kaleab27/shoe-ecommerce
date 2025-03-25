import { eq } from "drizzle-orm";
import db from "@/db";
import { inventoryTable } from "@/db/schema";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const orderItems = await db
            .select()
            .from(inventoryTable)
            .where(eq(inventoryTable.productId, id));
        return new Response(JSON.stringify(orderItems), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Fetching Inventory", {
            status: 500,
        });
    }
}
