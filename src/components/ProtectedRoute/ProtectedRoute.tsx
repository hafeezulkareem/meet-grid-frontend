import { Box } from "@mui/material";
import useUser from "../../hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { authenticated, loading, error } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading!!!
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Something went Wrong!!!
      </Box>
    );
  }

  return authenticated ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
