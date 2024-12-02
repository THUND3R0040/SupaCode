import { getUserById } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";

export function useUserInfoById(id) {
  const {
    data: userById,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
  return { userById };
}
