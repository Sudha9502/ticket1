import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider
} from "@mui/material";

import API from "../services/api";

import TicketCharts from "../components/TicketCharts";
import CategoryChart from "../components/CategoryChart";

export default function Dashboard() {

  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0
  });

  const [categories, setCategories] =
    useState([]);

  useEffect(() => {

    loadDashboard();

    loadCategoryStats();

  }, []);

  const loadDashboard = async () => {

    try {

      const response =
        await API.get("/dashboard");

      setStats({
        open:
          response.data.open || 0,

        inProgress:
          response.data.inProgress || 0,

        resolved:
          response.data.resolved || 0
      });

    }
    catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );

    }

  };

  const loadCategoryStats =
    async () => {

      try {

        const response =
          await API.get(
            "/category-stats"
          );

        let categoryData;

        if (
          response.data.body
        ) {

          categoryData =
            JSON.parse(
              response.data.body
            );

        }
        else {

          categoryData =
            response.data;

        }

        const chartData =
          Object.entries(
            categoryData
          ).map(
            (
              [key, value]
            ) => ({
              name: key,
              value: value
            })
          );

        setCategories(
          chartData
        );

      }
      catch (error) {

        console.log(
          "Category Error:",
          error
        );

      }

    };

  return (

    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4
      }}
    >

      <Typography
        variant="h4"
        gutterBottom
      >
        Ticket Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
      >

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >

          <Card
            elevation={4}
          >

            <CardContent>

              <Typography
                variant="h6"
                gutterBottom
              >
                Open Tickets
              </Typography>

              <Typography
                variant="h3"
              >
                {stats.open}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >

          <Card
            elevation={4}
          >

            <CardContent>

              <Typography
                variant="h6"
                gutterBottom
              >
                In Progress
              </Typography>

              <Typography
                variant="h3"
              >
                {stats.inProgress}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >

          <Card
            elevation={4}
          >

            <CardContent>

              <Typography
                variant="h6"
                gutterBottom
              >
                Resolved
              </Typography>

              <Typography
                variant="h3"
              >
                {stats.resolved}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      <Divider
        sx={{
          mt: 5,
          mb: 5
        }}
      />

      <Typography
        variant="h5"
        gutterBottom
      >
        Ticket Status Analytics
      </Typography>

      <TicketCharts
        stats={stats}
      />

      <Divider
        sx={{
          mt: 5,
          mb: 5
        }}
      />

      <Typography
        variant="h5"
        gutterBottom
      >
        Ticket Category Analytics
      </Typography>

      <CategoryChart
        data={categories}
      />

    </Container>
  );
}