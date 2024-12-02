import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getViewers } from "@/services/Api";
import { useState } from "react";
import { deleteViewer as deleteViewerApi } from "@/services/Api";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

export default function ViewersList({ id, token, owner }) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [viewers, setViewers] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["viewers", id],
    queryFn: () => getViewers(id, token),
    enabled: !!token,
    onSuccess: (data) => {
      setViewers(data.data.viewers);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function deleteViewer(roomId, userId, token) {
    const res = await deleteViewerApi(roomId, userId, token);
    if (res.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["viewers", roomId] });
      toast.success("Viewer Deleted");
    } else {
      toast.error("Error Deleting Viewer");
    }
  }

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Viewers :</h2>
      {viewers.map((viewer) =>
        user?._id === owner?.data?.user?._id ? (
          <p
            onClick={() => {
              deleteViewer(id, viewer._id, token);
            }}
            key={viewer._id}
          >
            {viewer.username}
          </p>
        ) : (
          <p key={viewer._id}>{viewer.username}</p>
        )
      )}
    </div>
  );
}
