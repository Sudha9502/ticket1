import { useState } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

import {
  confirmResetPassword
}
from "aws-amplify/auth";

import {
  useSearchParams,
  useNavigate
}
from "react-router-dom";

export default function ResetPassword() {

  const [params] =
    useSearchParams();

  const email =
    params.get("email");

  const navigate =
    useNavigate();

  const [otp,
    setOtp] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const reset =
    async () => {

      await confirmResetPassword({

        username:
          email,

        confirmationCode:
          otp,

        newPassword:
          password

      });

      navigate(
        "/login"
      );

    };

  return (

    <Container
      maxWidth="sm"
      sx={{ mt: 5 }}
    >

      <Paper
        sx={{ p: 4 }}
      >

        <Typography
          variant="h4"
        >
          Reset Password
        </Typography>

        <TextField
          label="OTP"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e)=>
            setOtp(
              e.target.value
            )
          }
        />

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

        <Button
          variant="contained"
          fullWidth
          onClick={
            reset
          }
        >
          Reset Password
        </Button>

      </Paper>

    </Container>

  );
}