import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { FooterProps } from "../../../types";
import { VideocamOffOutlined } from "@mui/icons-material";

const createButtonStyle = (streaming) => ({
  width: "2.5rem",
  height: "2.5rem",
  backgroundColor: streaming ? "#3c4043" : "#ea4335",
  color: "white",
  "&:hover": {
    backgroundColor: streaming ? "#3c4043" : "#ea4335",
    boxShadow: "none",
  },
});

const Footer: React.FC<FooterProps> = ({ controls }) => {
  const { micOn, setMicOn, cameraOn, setCameraOn, socket, peerId } = controls;
  const { roomId } = useParams();

  const nowTime = dayjs(new Date()).format("hh:mm A");

  const handleAudio = () => {
    socket.emit("userAudioStatus", { peerId, muted: micOn });
    setMicOn(!micOn);
  };

  const handleVideo = () => {
    socket.emit("userVideoStatus", { peerId, playing: !cameraOn });
    setCameraOn(!cameraOn);
  };

  return (
    <Box
      sx={{
        height: "5em",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        padding: "32px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>{nowTime}</Typography>
        <Typography sx={{ margin: "0px 8px" }}>|</Typography>
        <Typography>{roomId}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "12px" }}>
        <IconButton sx={createButtonStyle(micOn)} onClick={handleAudio}>
          {micOn ? (
            <MicIcon fontSize="small" />
          ) : (
            <MicOffIcon fontSize="small" />
          )}
        </IconButton>
        <IconButton sx={createButtonStyle(cameraOn)} onClick={handleVideo}>
          {cameraOn ? (
            <VideocamOutlinedIcon fontSize="small" />
          ) : (
            <VideocamOffOutlined fontSize="small" />
          )}
        </IconButton>
        <IconButton
          sx={{
            width: "3.5rem",
            height: "2.5rem",
            borderRadius: "24px",
            backgroundColor: "#ea4335",
            color: "white",
            "&:hover": {
              backgroundColor: "#ea4335",
              boxShadow: "none",
            },
          }}
        >
          <CallEndIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex" }}>
        <IconButton size="small" sx={{ color: "white" }}>
          <ChatOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
