import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../../context/UserContext";
import useUser from "../../hooks/useUser";
import AppLogo from "../../common/AppLogo";
import TextInput from "../../common/TextInput";

const SigninRoute = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [pwdEmpty, setPwdEmpty] = useState(false);
  const [userNameEmpty, setUserNameEmpty] = useState(false);

  const [authFail, setAuthFail] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useContext(UserContext);

  const { authenticated, loading } = useUser();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    setAuthFail(false);
    setPwdEmpty(password === "");
    setUserNameEmpty(userName === "");

    if (password !== "" && userName !== "") {
      const userPayload = {
        userName: userName,
        password: password,
      };

      const response = await fetch("http://localhost:4000/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });

      if (response.ok) {
        const { jwtToken } = await response.json();
        Cookies.set("meet", jwtToken, { expires: 7 });
        userContext?.setAuthenticated(true);
        const destination = location.state?.from.pathname ?? "/";
        navigate(destination);
      } else {
        setAuthFail(true);
      }
    }
  };

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

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          height: "550px",
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
        <Typography sx={{ my: 2 }} variant="h5">
          Sign in
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: 17 }}>
          Use your Google Account
        </Typography>
        <Box component="form" noValidate>
          <Box sx={{ pl: 1 }}>
            <TextInput
              value={userName}
              setValue={setUserName}
              isEmpty={userNameEmpty}
              helperText={"User name can't be empty"}
              name={"Username"}
              type={"text"}
              autoFocus={true}
            />
            <TextInput
              value={password}
              setValue={setPassword}
              isEmpty={pwdEmpty}
              helperText={"Password can't be empty"}
              name={"Password"}
              type={"password"}
              autoFocus={false}
            />
            <Typography
              sx={{
                color: "#1A73E8",
                fontWeight: 600,
                fontSize: 15,
                mt: userNameEmpty ? 3 : 1,
                cursor: "pointer",
              }}
            >
              Forgot password?
            </Typography>
            {authFail && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                Wrong Credentials
              </div>
            )}
            <Typography sx={{ fontSize: 14, color: "#5F6368", mt: 3 }}>
              Not your computer? Use Guest mode to sign in privately.
            </Typography>
            <Typography
              sx={{
                color: "#1A73E8",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                mb: 5,
              }}
            >
              Learn more
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="button"
              sx={{ color: "#1A73e8" }}
              variant="text"
              size="small"
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, textTransform: "none" }}
              >
                Create account
              </Typography>
            </Button>
            <Button type="button" variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SigninRoute;
