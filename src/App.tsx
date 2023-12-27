import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@mui/material";

import HomeRoute from "./components/HomeRoute/HomeRoute";
import MeetRoomRoute from "./components/MeetRoomRoute/MeetRoomRoute";
import AuthenticationRoute from "./components/AuthenticationRoute/AuthenticationRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {path: "/login", Component: AuthenticationRoute},
  { path: "/", Component: ()=><ProtectedRoute><HomeRoute/></ProtectedRoute> },
  { path: "/:roomId", Component: ()=><ProtectedRoute><MeetRoomRoute/></ProtectedRoute> } ,
]);

function App() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
