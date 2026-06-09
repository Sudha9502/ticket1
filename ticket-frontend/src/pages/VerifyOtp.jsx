import { useState } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert
} from "@mui/material";

import {
  confirmSignUp
}
from "aws-amplify/auth";

import {
  useNavigate,
  useSearchParams
}
from "react-router-dom";

export default function VerifyOtp() {

  const [params] =
    useSearchParams();

  const email =
    params.get("email");

  const navigate =
    useNavigate();

  const [otp,
    setOtp] =
    useState("");

  const [error,
    setError] =
    useState("");

  const handleVerify =
    async () => {

      try {

        await confirmSignUp({

          username: email,

          confirmationCode:
            otp

        });

        navigate(
          "/login"
        );

      }
      catch (err) {

        setError(
          err.message
        );

      }

    };

  return (

    <Container
      maxWidth="sm"
      sx={{ mt: 5 }}
    >

      <Paper
        sx={{
          p: 4
        }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >
          Verify OTP
        </Typography>

        {error &&
          <Alert severity="error">
            {error}
          </Alert>
        }

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

        <Button
          variant="contained"
          fullWidth
          onClick={
            handleVerify
          }
        >
          Verify
        </Button>

      </Paper>

    </Container>

  );
}