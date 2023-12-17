import React from "react";
import {
  Box,
  Button,
  Input,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardIcon from "@mui/icons-material/Keyboard";

const MeetSetup = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ maxWidth: "40rem", padding: "1em 3em" }}>
      <Typography
        sx={{
          fontSize: "2.75rem",
          lineHeight: "3.25rem",
          paddingBottom: "0.5em",
        }}
      >
        Premium video meetings. Now free for everyone.
      </Typography>
      <Typography
        sx={{
          fontSize: "1.125rem",
          lineHeight: "1.5rem",
          paddingBottom: "3em",
          color: "#606468",
        }}
      >
        We re-engineered the service we built for secure business meetings,
        Google Meet, to make it free and available for all.
      </Typography>

      <Box sx={{ height: "3em", display: "flex", alignItems: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<VideoCallOutlinedIcon />}
          onClick={handlePopoverOpen}
          sx={{
            backgroundColor: "#1b72e8",
            paddingRight: "16px",
            paddingLeft: "12px",
            marginRight: "1.5em",
            textTransform: "unset",
            boxShadow: "none",
          }}
        >
          New meeting
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
        >
          <Paper>
            <MenuList
              sx={{
                "& .MuiMenuItem": {
                  minHeight: "48px",
                },
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddOutlinedIcon fontSize="small" sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText>Start an instant meeting</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <CalendarTodayIcon fontSize="small" sx={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText>Schedule in Calendar</ListItemText>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popover>

        <Input
          placeholder="Enter code"
          startAdornment={<KeyboardIcon sx={{ color: "#5f6367" }} />}
          sx={{ marginRight: "8px" }}
        />

        <Button>Join</Button>
      </Box>
    </Box>
  );
};

export default MeetSetup;
