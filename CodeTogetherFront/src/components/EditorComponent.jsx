import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "../socket";
import { getRoomContent } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditorComponent({ roomId, editWright, token }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  function handleEditorChange(value) {
    setCode(value);
    socket.emit("send-code", value, roomId);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRoomContent", roomId],
    queryFn: () => getRoomContent(roomId, token),
    enabled: !!token,
    onSuccess: (data) => {
      console.log(data);
      if (data.data.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
      setCode(data.data.content.content);
      toast.success("Editor Updated !");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went Wrong!");
    },
  });

  useEffect(() => {
    socket.emit("join-room", roomId);
    // socket.emit("sync-data", roomId);
    console.log("joined room", roomId);
  }, [roomId]);

  socket.on("code-change", (data) => {
    setCode(data);
  });

  // function excCode() {
  //   try {
  //     const rt = new Function(code);
  //     rt();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div className="border-2  border-black relative">
      {!editWright && (
        <div
          className="h-screen w-full absolute top-0 left-0 z-10 "
          onClick={() => {
            alert("You can't edit the code");
          }}
        ></div>
      )}
      <Editor
        disabled={!editWright}
        height="100vh"
        width="500px"
        defaultLanguage="javascript"
        onChange={handleEditorChange}
        value={code}
        theme="my-theme"
      />
      {/* <button onClick={excCode}>Click me</button> */}
    </div>
  );
}
