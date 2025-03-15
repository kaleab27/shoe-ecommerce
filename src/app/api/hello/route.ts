import { eq } from "drizzle-orm";
import db from "@/db";
import { usersTable } from "@/db/schema";

export async function GET(req: Request) {
    console.log(req);

    const users = await db.select().from(usersTable);
    console.log("Getting all users from the database: ", users);

    return new Response(JSON.stringify(users), {
        status: 200,
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await db.insert(usersTable).values(body);
        console.log("New user created!", body);
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        await db
            .update(usersTable)
            .set(body)
            .where(eq(usersTable.email, body.email));
        console.log("User info updated!", body);
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        await db.delete(usersTable).where(eq(usersTable.email, body.email));
        console.log("User deleted!", body);
        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return new Response("Error", { status: 500 });
    }
}
