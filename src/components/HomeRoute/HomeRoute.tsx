import React from "react";
import { Box } from "@mui/material";

import Header from "./Header/Header";

const HomeRoute = () => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Header />
    </Box>
  );
};

export default HomeRoute;
