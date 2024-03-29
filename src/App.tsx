import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@mui/material";
import {
  CalendarRoute,
  HomeRoute,
  MeetRoomRoute,
  ProtectedRoute,
  SignInRoute,
  SignUpRoute,
} from "./components";

const router = createBrowserRouter([
  { path: "/signin", Component: SignInRoute },
  { path: "/signup", Component: SignUpRoute },
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
  {
    path: "/calendar",
    Component: () => (
      <ProtectedRoute>
        <CalendarRoute />
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
