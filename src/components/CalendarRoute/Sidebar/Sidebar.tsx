import { Box } from "@mui/material";
import React, { FC } from "react";

interface Props {
  showSidebar: boolean;
}

const Sidebar: FC<Props> = (props) => {
  const { showSidebar } = props;

  return (
    <Box
      sx={{
        width: "256px",
        marginLeft: showSidebar ? "0px" : "-256px",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0s",
        background: "crimson",
      }}
    >
      Sidebar
    </Box>
  );
};

export default Sidebar;
