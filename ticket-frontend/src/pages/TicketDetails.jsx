import { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Button
} from "@mui/material";

import { useParams } from "react-router-dom";

import API from "../services/api";

export default function TicketDetails() {

  const { id } = useParams();

  const [ticket, setTicket] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [status, setStatus] =
    useState("");

  useEffect(() => {

    loadTicket();

  }, []);

  const loadTicket = async () => {

    try {

      const response =
        await API.get(
          `/ticket/${id}`
        );

      let ticketData;

      if (response.data.body) {

        ticketData =
          JSON.parse(
            response.data.body
          );

      } else {

        ticketData =
          response.data;

      }

      setTicket(
        ticketData
      );

      setStatus(
        ticketData.status
      );

    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };

  const updateTicketStatus =
    async () => {

      try {

        await API.put(
          `/ticket/${id}`,
          {
            status
          }
        );

        alert(
          "Status Updated Successfully"
        );

        loadTicket();

      }
      catch (error) {

        console.log(error);

        alert(
          "Failed to Update Status"
        );

      }

    };

  if (loading) {

    return (
      <CircularProgress />
    );

  }

  if (!ticket) {

    return (
      <h2>
        Ticket Not Found
      </h2>
    );

  }

  return (

    <Container
      maxWidth="md"
    >

      <Paper
        sx={{
          p: 4,
          mt: 4
        }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >
          Ticket Details
        </Typography>

        <Typography>
          <b>Ticket ID:</b>{" "}
          {ticket.ticket_id}
        </Typography>

        <br />

        <Typography>
          <b>Email:</b>{" "}
          {ticket.customerEmail}
        </Typography>

        <br />

        <Typography>
          <b>Subject:</b>{" "}
          {ticket.subject}
        </Typography>

        <br />

        <Typography>
          <b>Description:</b>{" "}
          {ticket.description}
        </Typography>

        <br />

        {ticket.attachmentUrl && (

          <Button
            variant="outlined"
            href={
              ticket.attachmentUrl
            }
            target="_blank"
            sx={{
              mb: 2
            }}
          >
            View Attachment
          </Button>

        )}

        <Typography>
          <b>Category:</b>{" "}
          {ticket.category}
        </Typography>

        <br />

        <Typography>
          <b>Priority:</b>{" "}
          {ticket.priority}
        </Typography>

        <br />

        <Typography>
          <b>Current Status:</b>{" "}
          {ticket.status}
        </Typography>

        <br />
        <br />

        <Typography
          variant="h6"
        >
          Update Status
        </Typography>

        <br />

        <Select
          fullWidth
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >

          <MenuItem
            value="OPEN"
          >
            OPEN
          </MenuItem>

          <MenuItem
            value="IN_PROGRESS"
          >
            IN_PROGRESS
          </MenuItem>

          <MenuItem
            value="RESOLVED"
          >
            RESOLVED
          </MenuItem>

        </Select>

        <br />
        <br />

        <Button
          variant="contained"
          onClick={
            updateTicketStatus
          }
        >
          Update Status
        </Button>

      </Paper>

    </Container>

  );

}