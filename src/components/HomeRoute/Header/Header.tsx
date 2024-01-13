import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Header = () => {
  const nowTime = dayjs(new Date()).format("hh:mm A");
  const nowDate = dayjs(new Date()).format("ddd, MMM DD");

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("meet");
    if (userContext?.setAuthenticated) {
      userContext?.setAuthenticated(false);
    }
    return navigate("/signin");
  };

  const goToCalendar = () => {
    navigate("/calendar");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#5f6367" }}>
        Meet Grid
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button type="button" variant="contained" onClick={goToCalendar}>
          Calendar
        </Button>
        <Box sx={{ color: "#5f6367", marginLeft: "16px" }}>
          <Typography component="span">{nowTime}</Typography>
          <Typography component="span"> • </Typography>
          <Typography component="span">{nowDate}</Typography>
        </Box>
        <Button
          type="button"
          variant="contained"
          onClick={handleLogout}
          sx={{ ml: 4 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
