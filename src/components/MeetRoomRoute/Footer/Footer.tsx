import React from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Box, IconButton, Typography, styled } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";

const BootstrapIconButton = styled(IconButton)({
  backgroundColor: "#3c4043",
  color: "white",
  "&:hover": {
    backgroundColor: "#3c4043",
    boxShadow: "none",
  },
});

const Footer = () => {
  const { roomId } = useParams();

  const nowTime = dayjs(new Date()).format("hh:mm A");

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
        <BootstrapIconButton size="medium">
          <MicIcon fontSize="small" />
        </BootstrapIconButton>
        <BootstrapIconButton size="medium">
          <VideocamOutlinedIcon fontSize="small" />
        </BootstrapIconButton>
        <BootstrapIconButton size="medium" sx={{ backgroundColor: "#ea4335" }}>
          <CallEndIcon fontSize="small" />
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
