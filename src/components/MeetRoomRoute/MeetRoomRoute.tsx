import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer/Footer";
import { Socket, io } from "socket.io-client";
import { Peer } from "peerjs";
import { v4 as uuid } from "uuid";
import { useMediaStream } from "../../hooks";
import ReactPlayer from "react-player";
import { User } from "../../types";

const MeetRoomRoute = () => {
  const { roomId } = useParams();
  const stream = useMediaStream();

  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<Peer | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);

  const [participants, setParticipants] = useState<Record<string, User>>({});

  // Initializing socketJS
  useEffect(() => {
    if (socketRef.current) return;

    socketRef.current = io("http://localhost:4000/");
    const socket = socketRef.current;

    socket.on("peerRemoved", (peerId) => {
      setParticipants((prev) => {
        const updatedParticipants = { ...prev };
        delete updatedParticipants[peerId];
        return updatedParticipants;
      });
    });

    setSocket(socket);
  }, []);

  // Initializing peer
  useEffect(() => {
    if (!socket || peerRef.current) return;

    peerRef.current = new Peer(uuid());
    const peer = peerRef.current;

    setPeer(peer);

    peer.on("open", (peerId: string) => {
      socket.emit("addPeer", { roomId, peerId });
    });
  }, [roomId, socket]);

  // Calling new participant
  useEffect(() => {
    if (!socket || !peer || !stream) return;

    socket.on("peerAdded", (peerId: string) => {
      const call = peer.call(peerId, stream);

      call.on("stream", (stream) => {
        setParticipants((prev) => ({
          ...prev,
          [peerId]: {
            id: peerId,
            name: "Hafeez",
            stream,
            playing: true,
            muted: true,
          },
        }));
      });
    });
  }, [peer, socket, stream]);

  // Picking up the call
  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call) => {
      const { peer: calledId } = call;
      call.answer(stream as MediaStream);

      call.on("stream", (stream) => {
        setParticipants((prev) => ({
          ...prev,
          [calledId]: {
            id: calledId,
            name: "Hafeez",
            stream,
            playing: true,
            muted: true,
          },
        }));
      });
    });
  }, [peer, stream]);

  useEffect(() => {
    if (!socket || !peer) return;

    const removeUser = () => {
      socket.emit("removePeer", { roomId, peerId: peer.id });
    };

    window.addEventListener("beforeunload", removeUser);

    return () => {
      window.removeEventListener("beforeunload", removeUser);
    };
  }, [socket, peer, roomId]);

  useEffect(() => {
    if (!stream || !peer) return;

    const peerId = peer.id;
    setParticipants((prev) => ({
      ...prev,
      [peerId]: {
        id: peerId,
        name: "Hafeez",
        stream,
        muted: true,
        playing: true,
      },
    }));
  }, [peer, stream]);

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Box sx={{ height: "calc(100vh - 5em)", display: "flex", gap: "16px" }}>
        {Object.keys(participants).map((participantId) => {
          const participant = participants[participantId];

          return (
            <ReactPlayer
              key={participantId}
              muted={participant.muted}
              playing={participant.playing}
              url={participant.stream}
              width="401px"
              height="400px"
            />
          );
        })}
      </Box>
      <Footer />
    </Box>
  );
};

export default MeetRoomRoute;
