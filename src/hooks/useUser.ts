import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/services/user";

interface User {
    id: number;
    email: string;
    name: string;
}

export function useUser() {
    return useQuery<User>({
        queryKey: ["user"],
        queryFn: getUser,
    });
}
