import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import Cookies from 'js-cookie'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Header = () => {
  const nowTime = dayjs(new Date()).format("hh:mm A");
  const nowDate = dayjs(new Date()).format("ddd, MMM DD");

  const userContext=useContext(UserContext)

  const navigate=useNavigate()

  const handleLogout=()=>{
    Cookies.remove("meet")
    if(userContext?.setAuthenticated) {
      userContext?.setAuthenticated(false)
    }
    return navigate("/login")
  }  

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
      <Box sx={{
        display: "flex",
      }}>
        <Box sx={{ color: "#5f6367" }}>
          <Typography component="span">{nowTime}</Typography>
          <Typography component="span"> • </Typography>
          <Typography component="span">{nowDate}</Typography>
        </Box>
        <Button
            type="button"
            variant="contained"
            onClick={handleLogout}
            sx={{ml:5,height:"30px"}}
          >
            Logout
          </Button>
      </Box>
    </Box>
  );
};

export default Header;
