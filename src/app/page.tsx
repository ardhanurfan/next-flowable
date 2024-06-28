"use client";

import { useEffect, useState } from "react";
import { ProcessDefinition } from "@/types";
import { fetchApp, startProcess, usernameLogin } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Home = () => {
  const router = useRouter();
  const [definitions, setDefinitions] = useState<ProcessDefinition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usernameLogin !== "admin") {
      router.push("/task");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetchApp();
        setDefinitions(response);
      } catch (error) {
        toast.error("Failed to fetch app definitions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleStartProcess = async (id: string, key: string, name: string) => {
    try {
      await startProcess({ id, key, name });
      toast.success(`Start ${name} process success`);
    } catch (error) {
      toast.error("Start process failed");
    }
  };

  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", my: 2 }}>Loading...</Typography>
    );
  }

  if (definitions.length === 0) {
    return <Typography sx={{ textAlign: "center", my: 2 }}>No data</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, mx: 0 }}>
      <Typography variant="h4" sx={{ flexGrow: 1, my: 2, mx: 2 }}>
        App Definitions
      </Typography>
      <Grid container spacing={2}>
        {definitions.map((definition) => (
          <Grid item xs={12} sm={6} md={3} key={definition.id}>
            <Card
              sx={{
                backgroundColor: "background.paper",
                color: "black",
                width: "100%",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6">{definition.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {definition.description}
                </Typography>
                <Typography variant="subtitle1">
                  {"app id: " + definition.id}
                </Typography>
                <Typography variant="subtitle1">
                  {"version: " + definition.version}
                </Typography>
                <CardActions>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      handleStartProcess(
                        definition.id,
                        definition.key,
                        definition.name
                      )
                    }
                    size="small"
                    sx={{ color: "white" }}
                  >
                    Start
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
