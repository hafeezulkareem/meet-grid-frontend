import { Box, Button, TextField, Typography } from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom"
import { useState,useContext, useEffect } from "react";
import Cookies from 'js-cookie'
import { UserContext } from "../../context/UserContext";
import useUser from "../../hooks/useUser";

const AuthenticationRoute = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [pwdEmpty,setPwdEmpty]=useState(false)
  const [userNameEmpty,setUserNameEmpty]=useState(false)

  const [authFail,setAuthFail]=useState(false)

  const navigate=useNavigate()
  const location=useLocation()
  const userContext=useContext(UserContext)

  const {authenticated,loading}=useUser()

  useEffect(()=>{
    if(authenticated) {
      navigate("/")
    }
  })

  const handleLogin = async () => {
    setAuthFail(false)
    setPwdEmpty(password==="") 
    setUserNameEmpty(userName==="")

    if(password!=="" && userName!=="") {
        const userPayload={
            userName:userName,
            password: password
        }

        const response=await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPayload),
        })

        if(response.ok) {
            const {jwtToken}=await response.json()
            Cookies.set("meet",jwtToken,{expires: 7})
            userContext?.setAuthenticated(true)
            const destination=location.state?.from.pathname ?? "/"
            navigate(destination)
        }
        else {
            setAuthFail(true)
        }
    }
  };

  if(loading) {
    return <Box sx={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>Loading!!!</Box>
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(16, 20, 24)",
      }}
    >
      <Box
        sx={{
          height: "400px",
          width: "350px",
          border: "1px solid lightgray",
          borderRadius: "5px",
          backgroundColor: "white",
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{marginBottom:"10px"}} variant="h5">Login</Typography>
        <Box component="form" noValidate sx={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
          <TextField
            required
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{width:"300px"}}
            error={userNameEmpty}
            helperText={userNameEmpty ? "User Name can't be empty" :""}
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{width:"300px"}}
            error={pwdEmpty}
            helperText={pwdEmpty ? "Password can't be empty" :""}
          />
          {authFail && <div style={{color:"red",marginBottom:"10px"}}>Wrong Credentials</div>}
          <Button
            type="button"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticationRoute;
