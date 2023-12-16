import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const Header = () => {
  const nowTime = dayjs(new Date()).format("hh:mm A");
  const nowDate = dayjs(new Date()).format("ddd, MMM DD");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 32px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#5f6367" }}>
        Meet Grid
      </Typography>
      <Box sx={{ color: "#5f6367" }}>
        <Typography component="span">{nowTime}</Typography>
        <Typography component="span"> • </Typography>
        <Typography component="span">{nowDate}</Typography>
      </Box>
    </Box>
  );
};

export default Header;
