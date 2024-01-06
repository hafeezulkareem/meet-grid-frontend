import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@mui/material";

import HomeRoute from "./components/HomeRoute/HomeRoute";
import MeetRoomRoute from "./components/MeetRoomRoute/MeetRoomRoute";
import SigninRoute from "./components/AuthenticationRoute/AuthenticationRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/AuthenticationRoute/SignUp";

const router = createBrowserRouter([
  { path: "/signin", Component: SigninRoute },
  { path: "/signup", Component: SignUp },
  {
    path: "/",
    Component: () => (
      <ProtectedRoute>
        <HomeRoute />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:roomId",
    Component: () => (
      <ProtectedRoute>
        <MeetRoomRoute />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
