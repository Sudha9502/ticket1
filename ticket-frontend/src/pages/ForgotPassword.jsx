import { useState } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

import {
  resetPassword
}
from "aws-amplify/auth";

import { useNavigate }
from "react-router-dom";

export default function ForgotPassword() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const sendCode =
    async () => {

      await resetPassword({

        username:
          email

      });

      navigate(

        `/reset-password?email=${email}`

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
          Forgot Password
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
        />

        <Button
          variant="contained"
          fullWidth
          onClick={
            sendCode
          }
        >
          Send OTP
        </Button>

      </Paper>

    </Container>

  );
}