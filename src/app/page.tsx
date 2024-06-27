"use client";

import { fetchApp, startProcess } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

export default async function Home() {
  const response = await fetchApp();

  const definitions = response.data as ProcessDefinition[];

  if (!definitions || definitions.length === 0) {
    return <Typography sx={{ textAlign: "center", my: 2 }}>No data</Typography>;
  }

  const handleStartProcess = async (id: string, key: string, name: string) => {
    try {
      await startProcess({ id, key, name });
      toast.success(`Start ${name} process success`);
    } catch (error) {
      toast.error("Start process failed");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mx: 0 }}>
      <Typography variant="h4" sx={{ flexGrow: 1, my: 2, mx: 2 }}>
        App Definitions
      </Typography>
      <Grid container spacing={2}>
        {definitions.map((definition: ProcessDefinition, idx: number) => (
          <Grid item xs={12} sm={6} md={3} key={idx.toString()}>
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
                <Typography
                  variant="subtitle1"
                  color={"text.secondary"}
                  key={definition.id}
                >
                  {definition.description}
                </Typography>
                <Typography variant="subtitle1" key={definition.id}>
                  {"app id :" + definition.id}
                </Typography>
                <Typography variant="subtitle1" key={definition.id}>
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
}
