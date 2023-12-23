import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer/Footer";
import { Socket, io } from "socket.io-client";
import { Peer } from "peerjs";
import { v4 as uuid } from "uuid";
import { useMediaStream } from "../../hooks";
import ReactPlayer from "react-player";

const MeetRoomRoute = () => {
  const { roomId } = useParams();

  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<Peer | null>(null);

  const stream = useMediaStream();

  useEffect(() => {
    if (socketRef.current) return;

    socketRef.current = io("http://localhost:4000/");
    const socket = socketRef.current;

    socket.on("connect", () => {
      const user = { name: "Hafeez", socketId: socket.id };
      socket.emit("addUser", user);
    });

    socket.on("peerAdded", (peerId: string) => {
      console.log(
        "🚀 ~ file: MeetRoomRoute.tsx:35 ~ socket.on ~ data:",
        peerId
      );
    });
  }, []);

  useEffect(() => {
    if (!socketRef.current || peerRef.current) return;

    const socket = socketRef.current;
    peerRef.current = new Peer(uuid());

    const peer = peerRef.current;

    peer.on("open", (peerId: string) => {
      socket.emit("addPeer", { roomId, peerId });
    });
  }, [roomId]);

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Box sx={{ height: "calc(100vh - 5em)" }}>
        <ReactPlayer playing url={stream as any} width="100%" height="100%" />
      </Box>
      <Footer />
    </Box>
  );
};

export default MeetRoomRoute;
