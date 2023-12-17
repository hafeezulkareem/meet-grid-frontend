import React from "react";
import { Box } from "@mui/material";

import Header from "./Header/Header";
import MeetSetup from "./MeetSetup/MeetSetup";

const HomeRoute = () => {
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
      </Box>
    </Box>
  );
};

export default HomeRoute;
