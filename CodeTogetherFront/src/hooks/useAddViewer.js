import { addViewer } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAddViewer(id, token, userId) {
  const navigate = useNavigate();
  const {
    data: viewers,
    isLoading: viewersLoading,
    error: viewersError,
  } = useQuery({
    queryKey: ["addViewer", id, userId],
    queryFn: () => addViewer(id, userId, token),
    enabled: !!token,
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success("You have been Added to the viewers' list");
      } else {
        if (data.response.data.message === "Room is full") {
          toast.error("Room is full");
          navigate("/dashboard");
        }
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return { viewers, viewersLoading, viewersError };
}
