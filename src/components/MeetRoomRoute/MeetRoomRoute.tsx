import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer/Footer";
import { Socket, io } from "socket.io-client";
import { Peer } from "peerjs";
import { v4 as uuid } from "uuid";
import { useMediaStream } from "../../hooks";
import { IUser } from "../../types";
import UserDisplay from "./UserDisplay/UserDisplay";

export const MeetRoomRoute = () => {
  const { roomId } = useParams();
  const stream = useMediaStream();

  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<Peer | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);

  const [muted, setMuted] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(true);

  const [participants, setParticipants] = useState<Record<string, IUser>>({});

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
      socket.emit("addPeer", { roomId, peerId, participants });
    });
  }, [participants, roomId, socket]);

  console.log("Participants", participants);

  // Calling new participant
  useEffect(() => {
    if (!socket || !peer || !stream) return;

    socket.on("peerAdded", (peerId: string) => {
      const call = peer.call(peerId, stream, {
        metadata: { olderPeerDetails: participants[peer.id] },
      });

      call.on("stream", (stream) => {
        setParticipants((prev) => ({
          ...prev,
          [peerId]: {
            id: peerId,
            name: "Hafeez",
            stream,
            playing: true,
            muted: false,
          },
        }));
      });
    });
  }, [participants, peer, socket, stream]);

  // Picking up the call
  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call) => {
      const {
        peer: calledId,
        metadata: { olderPeerDetails = {} },
      } = call;
      call.answer(stream as MediaStream);

      call.on("stream", (stream) => {
        setParticipants((prev) => ({
          ...prev,
          [calledId]: {
            ...olderPeerDetails,
            stream,
          },
        }));
      });
    });
  }, [peer, stream]);

  // User state update
  useEffect(() => {
    if (!socket || !peer) return;

    const removeUser = () => {
      socket.emit("removePeer", { roomId, peerId: peer.id });
    };

    socket.on("userAudioStatus", (data) => {
      if (participants[data.peerId]) {
        updateMutedStatus(data.peerId, data.muted);
      }
    });

    socket.on("userVideoStatus", (data) => {
      if (participants[data.peerId]) {
        updatePlayingStatus(data.peerId, data.playing);
      }
    });

    window.addEventListener("beforeunload", removeUser);

    return () => {
      window.removeEventListener("beforeunload", removeUser);
    };
  }, [socket, peer, roomId, participants]);

  // Adding self data
  useEffect(() => {
    if (!stream || !peer) return;

    const peerId = peer.id;
    setParticipants((prev) => ({
      ...prev,
      [peerId]: {
        id: peerId,
        name: "Hafeez",
        stream,
        muted: false,
        playing: true,
      },
    }));
  }, [peer, stream]);

  const updateMutedStatus = (peerId: string, muted: boolean) => {
    setParticipants((prev) => {
      const updatedParticipants = { ...prev };
      updatedParticipants[peerId].muted = muted;
      return updatedParticipants;
    });
  };

  const updatePlayingStatus = (peerId: string, playing: boolean) => {
    setParticipants((prev) => {
      const updatedParticipants = { ...prev };
      updatedParticipants[peerId].playing = playing;
      return updatedParticipants;
    });
  };

  const toggleAudio = () => {
    const peerId = peer?.id as string;
    const updatedMuted = !muted;

    socket?.emit("userAudioStatus", { peerId, muted: updatedMuted });
    setMuted(updatedMuted);
    updateMutedStatus(peerId, updatedMuted);
  };

  const toggleVideo = () => {
    const peerId = peer?.id as string;
    const updatedPlaying = !playing;

    socket?.emit("userVideoStatus", { peerId, playing: updatedPlaying });
    setPlaying(updatedPlaying);
    updatePlayingStatus(peerId, updatedPlaying);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#202124" }}>
      <Box
        sx={{
          height: "calc(100vh - 5em)",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          padding: "32px",
        }}
      >
        {Object.keys(participants).map((participantId) => {
          const participant = participants[participantId];
          const mySelf = participant.id === peer?.id;

          const isMuted = mySelf ? muted : participant.muted;
          const isPlaying = mySelf ? playing : participant.playing;

          return (
            <UserDisplay
              key={participantId}
              name={participant.name}
              muted={isMuted}
              playing={isPlaying}
              stream={participant.stream}
            />
          );
        })}
      </Box>
      <Footer
        controls={{
          muted,
          toggleAudio,
          playing,
          toggleVideo,
        }}
      />
    </Box>
  );
};
