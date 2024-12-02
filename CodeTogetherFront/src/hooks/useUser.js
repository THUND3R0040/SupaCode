import { getUser } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    onSuccess: (data) => {
      if (!data) {
        navigate("/login");
      }
    },
    onError: (error) => {
      navigate("/login");
    },
  });
  return { user, userLoading, userError };
}
