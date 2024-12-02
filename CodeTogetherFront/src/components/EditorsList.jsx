import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEditors } from "@/services/Api";
import { useState } from "react";
import { deleteEditor as deleteEditorApi } from "@/services/Api";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

export default function EditorsList({ id, token, owner }) {
  const queryClient = useQueryClient();
  const [editors, setEditors] = useState([]);
  const { user } = useUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ["editors", id],
    queryFn: () => getEditors(id, token),
    enabled: !!token,
    onSuccess: (data) => {
      setEditors(data.data.editors);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function deleteEditor(roomId, userId, token) {
    const res = await deleteEditorApi(roomId, userId, token);
    if (res.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["editors", roomId] });
      toast.success("Editor Deleted");
    } else {
      toast.error("Error Deleting editor");
    }
  }

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Editors :</h2>
      {editors.map((editor) =>
        user?._id === owner?.data?.user?._id ? (
          <p
            onClick={() => {
              deleteEditor(id, editor._id, token);
            }}
            key={editor._id}
          >
            {editor.username}
          </p>
        ) : (
          <p key={editor._id}>{editor.username}</p>
        )
      )}
    </div>
  );
}
