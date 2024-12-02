import { useToken } from "@/hooks/useToken";
import React from "react";
import RoomConfig from "./RoomConfig";

export default function Dashboard() {
  const { token } = useToken();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <RoomConfig />
    </div>
  );
}
