import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/getCurrentUser";
import { userKeys } from "../utils/queryKeys";

export function useCurrentUser() {
    return useQuery({
        queryKey: userKeys.current,
        queryFn: getCurrentUser,
    });
}