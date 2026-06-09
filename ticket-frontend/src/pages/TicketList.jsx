import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function TicketList() {

  const [tickets, setTickets] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("newest");

  const navigate =
    useNavigate();

  useEffect(() => {

    loadTickets();

  }, []);

  const loadTickets = async () => {

    try {

      const response =
        await API.get("/tickets");

      if (response.data.body) {

        setTickets(
          JSON.parse(
            response.data.body
          )
        );

      } else {

        setTickets(
          response.data
        );

      }

    }
    catch (error) {

      console.log(error);

    }
    console.log(
  "Priorities:",
  response.data
);

  };

  const filteredTickets =
    tickets

      .filter(ticket =>
        ticket.subject
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )

      .filter(ticket =>
        status === ""
          ? true
          : ticket.status === status
      )

      .filter(ticket =>
  priority === ""
    ? true
    : ticket.priority
        ?.toUpperCase()
        .trim() === priority
)

      .sort((a, b) => {

        if (
          sortOrder ===
          "newest"
        ) {

          return (
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            )
          );

        }

        return (
          new Date(
            a.createdAt
          ) -
          new Date(
            b.createdAt
          )
        );

      });

  return (

    <Container>

      <Typography
        variant="h4"
        sx={{
          mt: 3,
          mb: 3
        }}
      >

        All Tickets

      </Typography>

      <TextField
        fullWidth
        label="Search Tickets"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        sx={{ mb: 3 }}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap"
        }}
      >

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          sx={{
            width: 200
          }}
        >

          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="OPEN">
            Open
          </MenuItem>

          <MenuItem value="IN_PROGRESS">
            In Progress
          </MenuItem>

          <MenuItem value="RESOLVED">
            Resolved
          </MenuItem>

        </TextField>

        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
          sx={{
            width: 200
          }}
        >

          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="HIGH">
            High
          </MenuItem>

          <MenuItem value="MEDIUM">
            Medium
          </MenuItem>

          <MenuItem value="LOW">
            Low
          </MenuItem>

        </TextField>

        <TextField
          select
          label="Sort"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(
              e.target.value
            )
          }
          sx={{
            width: 200
          }}
        >

          <MenuItem
            value="newest"
          >
            Newest First
          </MenuItem>

          <MenuItem
            value="oldest"
          >
            Oldest First
          </MenuItem>

        </TextField>

      </Box>

      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Ticket ID
              </TableCell>

              <TableCell>
                Subject
              </TableCell>

              <TableCell>
                Category
              </TableCell>

              <TableCell>
                Priority
              </TableCell>

              <TableCell>
                Status
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredTickets.map(
              (ticket) => (

                <TableRow
                  key={
                    ticket.ticket_id
                  }
                  hover
                  sx={{
                    cursor:
                      "pointer"
                  }}
                  onClick={() =>
                    navigate(
                      `/ticket/${ticket.ticket_id}`
                    )
                  }
                >

                  <TableCell>
                    {
                      ticket.ticket_id
                    }
                  </TableCell>

                  <TableCell>
                    {
                      ticket.subject
                    }
                  </TableCell>

                  <TableCell>
                    {
                      ticket.category
                    }
                  </TableCell>

                  <TableCell>
                    {
                      ticket.priority
                    }
                  </TableCell>

                  <TableCell>
                    {
                      ticket.status
                    }
                  </TableCell>

                </TableRow>

              )
            )}

          </TableBody>

        </Table>

      </Paper>

    </Container>

  );
}