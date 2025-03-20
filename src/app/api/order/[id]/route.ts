import db from "@/db";
import { orderItemsTable } from "@/db/schema";

export async function GET() {
    try {
        const orders = await db.select().from(orderItemsTable);
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Fetching Product Categories", {
            status: 500,
        });
    }
}
