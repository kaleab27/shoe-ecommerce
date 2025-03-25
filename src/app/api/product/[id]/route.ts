import db from "@/db";
import { eq } from "drizzle-orm";
import { productsTable } from "@/db/schema";
import { NextApiRequest } from "next";

export async function GET(
    req: NextApiRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    console.log(req);
    const productId = (await params).id;
    try {
        const product = await db
            .select()
            .from(productsTable)
            .where(eq(productsTable.id, productId));
        if (!product) throw new Error("there is no product in this id");

        return Response.json({
            status: "success",
            data: product,
        });
    } catch (err) {
        return Response.json({
            status: "fail",
            message: err,
        });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const productId = (await params).id;
    const reqBody = await req.json();
    if (!reqBody) {
        return;
    }
    try {
        const product = await db
            .update(productsTable)
            .set(reqBody)
            .where(eq(productsTable.id, productId));
        if (!product) throw new Error("there is no product in this id");
        return Response.json({
            status: "success",
            data: product,
        });
    } catch (err) {
        return Response.json({
            status: "fail",
            message: err,
        });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const productId = (await params).id;
    try {
        const deleteProduct = await db
            .delete(productsTable)
            .where(eq(productsTable.id, productId));
        if (!deleteProduct) throw new Error("there is no user in this id");
        return Response.json({
            status: "sucess",
        });
    } catch (err) {
        return Response.json({
            status: "fail",
            massage: err,
        });
    }
}
