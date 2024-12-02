import { addEditor } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";

export function useAddEditor(id, token, userId) {
  const {
    data: editors,
    isLoading: editorsLoading,
    error: editorsError,
  } = useQuery({
    queryKey: ["addEditor", id, userId],
    queryFn: () => addEditor(id, userId, token),
    enabled: !!token,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { editors, editorsLoading, editorsError };
}
