import EditorComponent from "@/components/EditorComponent";
import ViewersList from "@/components/ViewersList";
import EditorsList from "@/components/EditorsList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "@/hooks/useToken";
import { useRooms } from "@/hooks/useRooms";
import { useAddViewer } from "@/hooks/useAddViewer";
import { useUser } from "@/hooks/useUser";
import { useUserInfoById } from "@/hooks/useUserInfoById";

export default function Room() {
  const [timer, setTimer] = useState(5);
  const [editWright, setEditWright] = useState(false);
  const [isValidRoom, setIsValidRoom] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  const { token, tokenLoading, tokenError } = useToken(); // get the token
  const { user, userLoading, userError } = useUser(); // get the user Info

  const {
    data: rooms,
    isLoading: roomsLoading,
    error: roomsError,
  } = useRooms(id, token); // get the room info

  useEffect(() => {
    if (roomsLoading) return;
    if (rooms?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
    if (rooms?.status === 200) {
      setIsValidRoom(true);
    } else {
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
      const timerInterval = setInterval(() => {
        setTimer((Timer) => timer - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [rooms, roomsLoading, navigate, timer]);

  const { userById: owner } = useUserInfoById(rooms?.data?.room?.owner);

  const { viewers, viewersLoading, viewersError } = useAddViewer(
    id,
    token,
    user?._id
  ); // add the user to the room viewers list

  useEffect(() => {
    if (
      isValidRoom &&
      (rooms?.data?.room?.editors.includes(user?._id) ||
        user?._id === owner?.data?.user?._id)
    ) {
      if (!editWright) setEditWright(true);
    }
  }, [isValidRoom, rooms, user, owner]);

  if (roomsLoading) {
    return <p>Loading...</p>;
  }
  if (!isValidRoom) {
    return (
      <div>
        <p>Room not found</p>
        <p>Redirecting to dashboard in {timer} seconds</p>
      </div>
    );
  }
  if (
    rooms?.data?.room?.viewers.length + rooms?.data?.room?.editors.length >
    rooms?.data?.room?.roomCapacity
  ) {
    return <p>Room is full</p>;
  }

  return (
    <div className="flex flex-row ">
      <EditorComponent roomId={id} editWright={editWright} token={token} />
      <div className="flex flex-col">
        <span>Owner : {owner?.data?.user?.username}</span>
        <EditorsList id={id} token={token} owner={owner} />
        <ViewersList id={id} token={token} owner={owner} />
      </div>
    </div>
  );
}
