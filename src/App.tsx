import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@mui/material";

import HomeRoute from "./components/HomeRoute/HomeRoute";
import MeetRoomRoute from "./components/MeetRoomRoute/MeetRoomRoute";

const router = createBrowserRouter([
  { path: "/", Component: HomeRoute },
  { path: "/:roomId", Component: MeetRoomRoute },
]);

function App() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
