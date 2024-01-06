import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppLogo from "../../common/AppLogo";
import TextInput from "../../common/TextInput";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const [matching, setMatching] = useState(true);

  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(`${email}@gmail.com`);
  };

  const handleSignup = async () => {
    setConfirmPasswordEmpty(confirmPassword === "");
    setPasswordEmpty(password === "");
    setEmailEmpty(email === "");

    const isMatching = password === confirmPassword;
    setMatching(isMatching);

    if (!validateEmail()) return;

    const userPayload = { email: `${email}@gmail.com`, password };

    const response = await fetch("http://localhost:4000/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPayload),
    });

    response.ok ? navigate("/") : setEmailTaken(true);
  };

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

        <Typography sx={{ fontWeight: 400, fontSize: 19, mt: 3 }}>
          Create a Google Account
        </Typography>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 400, fontSize: 16, mt: 3 }}>
            Create a strong password with a mixture of letters, numbers and
            symbols
          </Typography>
        </Box>
        <Box component="form" noValidate>
          <Box sx={{ pl: 1 }}>
            <TextInput
              value={email}
              setValue={setEmail}
              isError={emailEmpty || emailTaken}
              helperText={
                emailTaken ? "email already taken" : "email shouldn't be empty"
              }
              name={"Create a Gmail address"}
              type={"text"}
              autoFocus={true}
              addGmailDomain
            />
            <TextInput
              value={password}
              setValue={setPassword}
              isError={passwordEmpty}
              helperText={"Password can't be empty"}
              name={"Password"}
              type={"password"}
              autoFocus={false}
            />
            <TextInput
              value={confirmPassword}
              setValue={setConfirmPassword}
              isError={confirmPasswordEmpty}
              helperText={"Password can't be empty"}
              name={"Confirm"}
              type={"password"}
              autoFocus={false}
            />
          </Box>
          {!matching && (
            <Typography sx={{ mt: 2, color: "red", textAlign: "center" }}>
              Passwords not matching!
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box></Box>
            <Button
              type="button"
              variant="contained"
              onClick={handleSignup}
              sx={{ mt: 3 }}
            >
              create
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
