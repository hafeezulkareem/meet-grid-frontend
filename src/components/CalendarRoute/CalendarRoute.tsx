import React, { useState } from "react";
import Header from "./Header/Header";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";

export const CalendarRoute = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const toggleSidebarVisibility = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header toggleSidebar={toggleSidebarVisibility} />
      <Box sx={{ display: "flex", flexGrow: "1" }}>
        <Sidebar showSidebar={showSidebar} />
        <Box sx={{ background: "seagreen", flexGrow: "1" }}>
          Calendar comes here
        </Box>
      </Box>
    </Box>
  );
};
