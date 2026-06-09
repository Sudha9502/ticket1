import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@mui/material";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  signOut
} from "aws-amplify/auth";

export default function Navbar() {

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {

      try {

        await signOut();

        navigate("/login");

      }
      catch (error) {

        console.log(error);

      }

    };

  return (

    <AppBar
      position="static"
    >

      <Toolbar>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold"
          }}
        >
          AI Ticket Triage System
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/create-ticket"
        >
          Create Ticket
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/tickets"
        >
          Tickets
        </Button>

        <Button
          color="inherit"
          onClick={
            handleLogout
          }
        >
          Logout
        </Button>

      </Toolbar>

    </AppBar>

  );
}