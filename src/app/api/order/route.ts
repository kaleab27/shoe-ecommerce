import db from "@/db/index";
import { ordersTable, orderItemsTable } from "@/db/schema";

export async function POST(req: Request) {
    console.log(req);
    try {
        const body = await req.json();
        // const [order] = await db
        //     .insert(ordersTable)
        //     .values(body.order)
        //     .returning({ id: ordersTable.id });
        // console.log(order);

        // const orderItemsWithOrderId = body.orderItems.map((item: any) => ({
        //     ...item,
        //     orderId: order.id,
        // }));

        // console.log(orderItemsWithOrderId);
        // await db.insert(orderItemsTable).values(orderItemsWithOrderId);
        let ret = {};
        await db.transaction(async (tx) => {
            const [order] = await tx
                .insert(ordersTable)
                .values(body.order)
                .returning({ id: ordersTable.id });
            console.log(order);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const orderItemsWithOrderId = body.orderItems.map((item: any) => ({
                ...item,
                orderId: order.id,
            }));
            console.log(orderItemsWithOrderId);
            await tx.insert(orderItemsTable).values(orderItemsWithOrderId);
            ret = {
                order: body.order,
                orderItems: orderItemsWithOrderId,
            };
        });
        return new Response(JSON.stringify(ret), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error creating order", { status: 500 });
    }
}

export async function GET() {
    try {
        const orders = await db.select().from(ordersTable);
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Fetching Product Categories", {
            status: 500,
        });
    }
}
