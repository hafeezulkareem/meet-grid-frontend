import { Box, IconButton, Typography } from "@mui/material";
import React, { FC } from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  toggleSidebar: () => void;
}

const Header: FC<Props> = (props) => {
  const { toggleSidebar } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 24px 8px 16px",
        borderBottom: "1px solid rgb(218,220,224)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <img
          src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_13_2x.png"
          alt="Calendar Icon"
          style={{ width: "40px", height: "40px" }}
        />
        <Typography
          sx={{ color: "rgb(60,64,67)", fontSize: "22px", lineHeight: "24px" }}
        >
          Calendar
        </Typography>
      </Box>
      <Typography>Profile</Typography>
    </Box>
  );
};

export default Header;
