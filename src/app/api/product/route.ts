import db from "@/db";
import { productsTable } from "@/db/schema";

export async function GET(req: Request) {
    try {
        const products = await db.select().from(productsTable);
        if (!products) throw new Error("can't find products");
        return Response.json({
            status: 201,
            data: products,
        });
    } catch (err: unknown) {
        return Response.json({
            status: 400,
            message: err,
        });
    }
}
//
export async function POST(req: Request) {
    try {
        const reqBody = await req.json();
        const productData = await db.insert(productsTable).values(reqBody);
        if (!productData) throw new Error("product can't added");
        return Response.json({
            status: "success",
            data: reqBody,
        });
    } catch (err: any) {
        console.log(err);
        return Response.json({
            status: 400,
            message: err,
        });
    }
}
