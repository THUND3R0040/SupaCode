import { getRoom } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";

export function useRooms(id, token) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoom(id, token),
    enabled: !!token,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { data, isLoading, error };
}
