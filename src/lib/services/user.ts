export async function getUser() {
    const response = await fetch("/api/user", {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data;
}
