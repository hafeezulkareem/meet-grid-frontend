import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./Footer/Footer";

const MeetRoomRoute = () => {
  const { roomId } = useParams();

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <Box sx={{ height: "calc(100vh - 5em)" }}>Videos will come here</Box>
      <Footer />
    </Box>
  );
};

export default MeetRoomRoute;
