import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import Footer from "./Footer/Footer";
import { Socket, io } from "socket.io-client";
import { Peer } from "peerjs";
import { v4 as uuid } from "uuid";
import { useMediaStream } from "../../hooks";
import { User } from "../../types";
import UserDisplay from "./UserDisplay/UserDisplay";
import { CARD_MIN_HEIGHT, CARD_MIN_WIDTH } from "../../constants";

const MeetRoomRoute = () => {
  const { roomId } = useParams();
  const stream = useMediaStream();

  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<Peer | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const [participants, setParticipants] = useState<Record<string, User>>({});
  const [participantsRenderCount, setParticipantsRenderCount] =
    useState<number>(0);

  const [cardStyles, setCardStyles] = useState<CSSProperties>({});

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
            muted: false,
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
            muted: false,
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

    socket.on("userAudioStatus", (data) => {
      if (participants[data.peerId]) {
        setParticipants((prev) => {
          const updatedParticipants = { ...prev };
          updatedParticipants[data.peerId].muted = data.muted;
          return updatedParticipants;
        });
      }
    });

    socket.on("userVideoStatus", (data) => {
      if (participants[data.peerId]) {
        setParticipants((prev) => {
          const updatedParticipants = { ...prev };
          updatedParticipants[data.peerId].playing = data.playing;
          return updatedParticipants;
        });
      }
    });

    window.addEventListener("beforeunload", removeUser);

    return () => {
      window.removeEventListener("beforeunload", removeUser);
    };
  }, [socket, peer, roomId, participants]);

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

  const participantsCount = useMemo(
    () => Object.keys(participants).length,
    [participants]
  );

  const renderCount = useMemo(
    () =>
      participantsCount > participantsRenderCount
        ? participantsRenderCount - 1
        : participantsRenderCount,
    [participantsCount, participantsRenderCount]
  );

  useLayoutEffect(() => {
    const calculateCardDimensions = () => {
      // Available space for rendering participants
      const spaceWidth = window.innerWidth - 64;
      const spaceHeight = window.innerHeight - 64 - 80;

      const gutter = 16;

      let width = spaceWidth;
      let height = spaceHeight;

      while (
        participantsCount * width > spaceWidth ||
        participantsCount * height > spaceHeight
      ) {
        width -= 50;
        height -= 50;

        const surrenderMinWidth = width <= CARD_MIN_WIDTH;
        const surrenderMinHeight = height <= CARD_MIN_HEIGHT;

        if (surrenderMinWidth) {
          width = CARD_MIN_WIDTH;
        }

        if (surrenderMinHeight) {
          height = CARD_MIN_HEIGHT;
        }

        if (surrenderMinWidth && surrenderMinHeight) break;
      }

      const participantsCanRender =
        Math.floor((spaceWidth + gutter) / (width + gutter)) *
        Math.floor((spaceHeight + gutter) / (height + gutter));

      console.log(
        Math.min(participantsCount, participantsCanRender),
        width,
        height
      );
      setParticipantsRenderCount(
        Math.min(participantsCount, participantsCanRender)
      );
      setCardStyles({ minWidth: `${width}px`, minHeight: `${height}px` });
    };

    calculateCardDimensions();

    window.addEventListener("resize", calculateCardDimensions);

    return () => {
      window.removeEventListener("resize", calculateCardDimensions);
    };
  }, [participantsCount]);

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#202124" }}>
      <Box
        sx={{
          height: "calc(100vh - 5em)",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          padding: "16px",
        }}
      >
        {Object.keys(participants)
          .slice(0, renderCount)
          .map((participantId) => {
            const participant = participants[participantId];
            const mySelf = participant.id === peer?.id;

            const muted = mySelf ? !micOn : participant.muted;
            const playing = mySelf ? cameraOn : participant.playing;

            return (
              <UserDisplay
                key={participantId}
                name={participant.name}
                muted={muted}
                playing={playing}
                stream={participant.stream}
                containerStyles={cardStyles}
              />
            );
          })}

        {participantsCount > participantsRenderCount && (
          <Box
            sx={{
              flexGrow: "1",
              overflow: "hidden",
              border: "2px solid transparent",
              borderRadius: "8px",
              position: "relative",
              backgroundColor: "#3c4043",
              ...cardStyles,
            }}
          >
            <Avatar
              sx={{
                width: "10rem",
                height: "10rem",
                backgroundColor: "transparent",
                fontSize: "5rem",
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              +{participantsCount - participantsRenderCount + 1}
            </Avatar>
          </Box>
        )}
      </Box>
      <Footer
        controls={{
          micOn,
          setMicOn,
          cameraOn,
          setCameraOn,
          socket,
          peerId: peer?.id,
        }}
      />
    </Box>
  );
};

export default MeetRoomRoute;
