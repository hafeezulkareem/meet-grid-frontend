import AppLogo from "../../common/AppLogo";
import { Box } from "@mui/material";

export const FormCard = ({ children }) => {
  return (
    <Box
      sx={{
        width: "448px",
        border: "1px solid lightgray",
        borderRadius: "5px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "48px 40px 36px",
      }}
    >
      <AppLogo />
      {children}
    </Box>
  );
};
