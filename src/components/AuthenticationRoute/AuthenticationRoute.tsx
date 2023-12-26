import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AuthenticationRoute = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [pwdEmpty,setPwdEmpty]=useState(false)
  const [userNameEmpty,setUserNameEmpty]=useState(false)

  const handleLogin = () => {
    if(password==="") {
        setPwdEmpty(true)
    }
    if(username==="") {
        setUserNameEmpty(true)
    }
  };

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
