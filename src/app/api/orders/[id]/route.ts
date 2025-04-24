import { eq } from "drizzle-orm";
import db from "@/db";
import { ordersTable } from "@/db/schema";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    try {
        // Fetch the order details
        const order = await db
            .select()
            .from(ordersTable)
            .where(eq(ordersTable.id, id))
            .limit(1);

        if (!order.length) {
            return new Response("Order not found", { status: 404 });
        }

        console.log("orders: ", order);

        return new Response(JSON.stringify(order), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching order details:", error);
        return new Response("Error fetching order details", { status: 500 });
    }
}
