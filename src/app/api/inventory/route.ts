import db from "@/db/index";
import { inventoryTable } from "@/db/schema";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await db.insert(inventoryTable).values(body);
        return new Response(JSON.stringify(body), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error creating Inventory", { status: 500 });
    }
}

export async function GET() {
    try {
        const productCategories = await db.select().from(inventoryTable);
        return new Response(JSON.stringify(productCategories), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Fetching Inventory", {
            status: 500,
        });
    }
}
