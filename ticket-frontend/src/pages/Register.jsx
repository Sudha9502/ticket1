import { useState } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert
} from "@mui/material";

import { signUp } from "aws-amplify/auth";

import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleRegister =
    async () => {

      try {

        await signUp({

          username: email,

          password,

          options: {

            userAttributes: {

              email,

              name

            }

          }

        });

        navigate(
          `/verify?email=${email}`
        );

      }
      catch (err) {

        console.log(err);

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
          Create Account
        </Typography>

        {error &&
          <Alert severity="error">
            {error}
          </Alert>
        }

        {message &&
          <Alert severity="success">
            {message}
          </Alert>
        }

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e)=>
            setName(
              e.target.value
            )
          }
        />

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

        <TextField
          label="Password"
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
          sx={{ mt: 2 }}
          onClick={
            handleRegister
          }
        >
          Register
        </Button>

      </Paper>

    </Container>

  );
}