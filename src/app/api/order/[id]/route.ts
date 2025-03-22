import { eq } from "drizzle-orm";
import db from "@/db";
import { orderItemsTable } from "@/db/schema";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const orderItems = await db
            .select()
            .from(orderItemsTable)
            .where(eq(orderItemsTable.orderId, id));
        return new Response(JSON.stringify(orderItems), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Fetching Order Items", {
            status: 500,
        });
    }
}
