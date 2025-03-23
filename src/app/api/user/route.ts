import { clerkClient } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req);

    if (!userId) {
        console.log("ERROR: Couldn't get the user ID");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await clerkClient();
    const data = await user.users.getUser(userId);
    console.log(data);

    return new NextResponse(JSON.stringify(data), { status: 200 });

    // return NextResponse.json({
    //     fullName: data.fullName,
    //     primaryEmail: data.primaryEmailAddress?.emailAddress,
    // });
}
