import React, { useEffect, useState, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom as createRoomApi } from "@/services/Api";

const classs = "border-2 border-black w-full";

export default function RoomConfig() {
  const [userId, setUserId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [editors, setEditors] = useState([]);
  const [viewers, setViewers] = useState([]);

  const editorRef = createRef();
  const viewerRef = createRef();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserId(storedUser._id);
    }
  }, []);

  const navigate = useNavigate();

  const createRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // send data with token
    const data = Object.fromEntries(formData.entries());
    const req = {
      roomName: data.roomName,
      roomCapacity: data.roomCapacity,
      owner: userId,
      editors: editors,
      viewers: viewers,
    };
    const res = await createRoomApi(req, localStorage.getItem("token"));
    console.log(res);
    if (res.status === 201) {
      navigate("/Room/" + res.data.id);
    } else {
      console.log(res);
    }
  };
  return (
    <>
      <form className="w-1/2 mx-auto" onSubmit={createRoom}>
        <label>
          Room Name:
          <input type="text" name="roomName" required className={classs} />
        </label>
        <label>
          Room Capacity:
          <input type="number" name="roomCapacity" className={classs} />
        </label>
        <label>
          Editors:
          <input type="email" ref={editorRef} className={classs} />
        </label>
        <button
          type="button"
          onClick={() => {
            setEditors([...editors, editorRef.current.value]);
            setViewers([...viewers, editorRef.current.value]);
          }}
          className={classs}
        >
          Add Editor
        </button>
        <div>
          {editors.map((editor, index) => (
            <p key={index}>{editor}</p>
          ))}
        </div>

        <input type="email" ref={viewerRef} className={classs} />
        <button
          type="button"
          onClick={() => {
            setViewers([...viewers, viewerRef.current.value]);
          }}
          className={classs}
        >
          Add Viewer
        </button>
        <div>
          {viewers.map((viewer, index) => (
            <p key={index}>{viewer}</p>
          ))}
        </div>
        <button className="border-2 border-black w-full" type="submit">
          Save
        </button>
      </form>
    </>
  );
}
