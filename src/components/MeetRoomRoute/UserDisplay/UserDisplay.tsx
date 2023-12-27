import React, { FC } from "react";
import ReactPlayer from "react-player";
import { Avatar, Box, Typography } from "@mui/material";
import { MicOff } from "@mui/icons-material";

import styles from "./UserDisplay.module.css";
import { getNameInitials } from "../../../utils";

interface Props {
  name: string;
  playing: boolean;
  muted: boolean;
  stream: MediaStream;
}

const UserDisplay: FC<Props> = (props) => {
  const { name, playing, muted, stream } = props;

  return (
    <Box
      sx={{
        maxHeight: "100%",
        flexGrow: "1",
        overflow: "hidden",
        border: "2px solid transparent",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      {playing ? (
        <ReactPlayer
          url={stream}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
          className={styles.reactPlayer}
        />
      ) : (
        <Box sx={{ width: "100%", height: "100%", backgroundColor: "#3c4043" }}>
          <Avatar
            sx={{
              width: "15rem",
              height: "15rem",
              backgroundColor: "#02897b",
              fontSize: "5rem",
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          >
            {getNameInitials(name)}
          </Avatar>
        </Box>
      )}

      {muted && (
        <Box
          sx={{
            width: "32px",
            height: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(32,33,36,.3)",
            borderRadius: "100%",
            position: "absolute",
            top: "16px",
            right: "16px",
            color: "#ffffff",
          }}
        >
          <MicOff fontSize="small" />
        </Box>
      )}

      <Typography
        sx={{
          color: "#ffffff",
          position: "absolute",
          left: "12px",
          bottom: "12px",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default UserDisplay;
