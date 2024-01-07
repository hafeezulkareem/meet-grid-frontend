import React from "react";
import { Box } from "@mui/material";

import Header from "./Header/Header";
import MeetSetup from "./MeetSetup/MeetSetup";

export const HomeRoute = () => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <MeetSetup />

        <Box sx={{ maxWidth: "40rem", padding: "1em 3em" }}>
          Slider & Meetings
        </Box>
      </Box>
    </Box>
  );
};
