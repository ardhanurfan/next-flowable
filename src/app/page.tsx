import { fetchTasks } from "@/utils";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default async function Home() {
  const users = await fetchTasks();
  console.log(users);

  return (
    <Box sx={{ flexGrow: 1, mx: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flowable
          </Typography>
          <Button color="inherit">Task</Button>
        </Toolbar>
      </AppBar>
      <Button variant="contained" color="secondary">
        Button
      </Button>
    </Box>
  );
}
