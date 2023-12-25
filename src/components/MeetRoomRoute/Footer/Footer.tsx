import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Box, IconButton, Typography, styled } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { FooterProps } from "../../../types";
import { VideocamOffOutlined } from "@mui/icons-material";

const BootstrapIconButton = styled(IconButton)({
  backgroundColor: "#3c4043",
  color: "white",
  "&:hover": {
    backgroundColor: "#3c4043",
    boxShadow: "none",
  },
});

const createButtonStyle = (streaming) => ({
  backgroundColor: streaming ? "#3c4043" : "#ff4000",
  color: "white",
  "&:hover": {
    backgroundColor: streaming ? "#3c4043" : "#ff4000",
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

      <Box sx={{ display: "flex", gap: "16px" }}>
        <BootstrapIconButton
          size="medium"
          sx={createButtonStyle(micOn)}
          onClick={handleAudio}
        >
          {micOn ? (
            <MicIcon fontSize="medium" />
          ) : (
            <MicOffIcon fontSize="medium" />
          )}
        </BootstrapIconButton>
        <BootstrapIconButton
          size="medium"
          sx={createButtonStyle(cameraOn)}
          onClick={handleVideo}
        >
          {cameraOn ? (
            <VideocamOutlinedIcon fontSize="medium" />
          ) : (
            <VideocamOffOutlined fontSize="medium" />
          )}
        </BootstrapIconButton>
        <BootstrapIconButton size="medium" sx={createButtonStyle(false)}>
          <CallEndIcon fontSize="medium" />
        </BootstrapIconButton>
      </Box>

      <Box sx={{ display: "flex" }}>
        <IconButton size="medium" sx={{ color: "white" }}>
          <ChatOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
