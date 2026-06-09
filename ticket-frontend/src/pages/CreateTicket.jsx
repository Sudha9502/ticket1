import { useState } from "react";

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert
} from "@mui/material";

import API from "../services/api";

export default function CreateTicket() {

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const createTicket = async () => {

    try {

      let attachmentUrl = "";

      if (file) {

        const reader =
          new FileReader();

        const base64 =
          await new Promise(
            (resolve) => {

              reader.readAsDataURL(
                file
              );

              reader.onload =
                () => {

                  resolve(
                    reader.result
                      .split(",")[1]
                  );

                };

            }
          );

        const uploadResponse =
          await API.post(
            "/upload",
            {
              fileName:
                file.name,

              file:
                base64
            }
          );

        if (
          uploadResponse.data.body
        ) {

          const uploadData =
            JSON.parse(
              uploadResponse.data.body
            );

          attachmentUrl =
            uploadData.fileUrl;

        } else {

          attachmentUrl =
            uploadResponse.data.fileUrl;

        }

      }

      const response =
        await API.post(
          "/ticket",
          {
            customerEmail,
            subject,
            description,
            attachmentUrl
          }
        );

      console.log(
        response.data
      );

      setMessage(
        "Ticket Created Successfully"
      );

      setCustomerEmail("");
      setSubject("");
      setDescription("");
      setFile(null);

    }
    catch (error) {

      console.log(error);

      setMessage(
        "Failed To Create Ticket"
      );

    }

  };

  return (

    <Container
      maxWidth="sm"
    >

      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4
        }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >

          Create Ticket

        </Typography>

        {message && (

          <Alert
            severity="info"
            sx={{
              mb: 2
            }}
          >

            {message}

          </Alert>

        )}

        <TextField
          fullWidth
          label="Customer Email"
          margin="normal"
          value={
            customerEmail
          }
          onChange={(e) =>
            setCustomerEmail(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          label="Subject"
          margin="normal"
          value={
            subject
          }
          onChange={(e) =>
            setSubject(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          margin="normal"
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <Button
          component="label"
          variant="outlined"
          sx={{
            mt: 2
          }}
        >

          Upload Attachment

          <input
            hidden
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

        </Button>

        {file && (

          <Typography
            sx={{
              mt: 1
            }}
          >

            Selected: {file.name}

          </Typography>

        )}

        <Button
          variant="contained"
          sx={{
            mt: 3
          }}
          onClick={
            createTicket
          }
        >

          Create Ticket

        </Button>

      </Paper>

    </Container>

  );

}