export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
}
