import { useState } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box
} from "@mui/material";
import { Link }
from "react-router-dom";
import { signIn }
from "aws-amplify/auth";

import { useNavigate }
from "react-router-dom";

export default function Login() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [error,
    setError] =
    useState("");

  const handleLogin =
    async () => {

      try {

        setError("");

        await signIn({
          username: email,
          password
        });

        navigate("/");

      }
      catch (err) {

  console.log("Cognito Error:", err);

  setError(
    err.message || "Login Failed"
  );

}

    };

  return (

    <Container
      maxWidth="sm"
      sx={{
        mt: 10
      }}
    >

      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4
        }}
      >

        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          AI Ticket Triage
        </Typography>

        <Typography
          align="center"
          sx={{
            mb: 4
          }}
        >
          Sign In
        </Typography>

        {error && (

          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>

        )}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Box
          sx={{
            mt: 3
          }}
        >

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={
              handleLogin
            }
          >
            Login
          </Button>
          <Typography
  align="center"
  sx={{ mt: 2 }}
>

  New User?{" "}

  <Link
    to="/register"
  >
    Register Here
  </Link>

</Typography>

<Typography
  align="center"
  sx={{ mt: 2 }}
>

  <Link
    to="/forgot-password"
  >
    Forgot Password?
  </Link>

</Typography>

        </Box>

      </Paper>

    </Container>

  );
}