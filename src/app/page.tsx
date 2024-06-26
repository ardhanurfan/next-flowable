import { fetchApp } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export default async function Home() {
  const response = await fetchApp();

  const apps = response.data as AppDefinition[];

  if (!apps || apps.length === 0) {
    return <Typography sx={{ textAlign: "center", my: 2 }}>No data</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, mx: 0 }}>
      <Typography variant="h4" sx={{ flexGrow: 1, my: 2, mx: 2 }}>
        App Definitions
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}
      >
        {apps.map((app: AppDefinition) => (
          <Card
            key={app.id}
            sx={{
              backgroundColor: "background.paper",
              color: "black",
              gap: 2,
              mb: 2,
              minWidth: 275,
            }}
          >
            <CardContent>
              <Typography variant="h6" key={app.id}>
                {app.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color={"text.secondary"}
                key={app.id}
              >
                {app.description}
              </Typography>
              <Typography variant="subtitle1" key={app.id}>
                {"app id :" + app.id}
              </Typography>
              <Typography variant="subtitle1" key={app.id}>
                {"version: " + app.version}
              </Typography>
              <CardActions>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  sx={{ color: "white" }}
                >
                  Start
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
