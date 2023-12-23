import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer/Footer";
import { Socket, io } from "socket.io-client";

const MeetRoomRoute = () => {
  const { roomId } = useParams();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) return;

    socketRef.current = io("http://localhost:4000/");
    const socket = socketRef.current;

    socket?.on("connect", () => {
      const user = { name: "Hafeez", socketId: socket?.id };
      socket?.emit("addUser", user);
    });
  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Box sx={{ height: "calc(100vh - 5em)" }}>Videos will come here</Box>
      <Footer />
    </Box>
  );
};

export default MeetRoomRoute;
