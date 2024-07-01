"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "@/types";
import { Form } from "@/types/form";
import { fetchTaskForm, fetchTasks, postTaskForm } from "@/utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const TaskPage = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Form | null>(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [formValues, setFormValues] = useState<any>({});
  const [selected, setSelected] = useState<string>("");

  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoadingTasks(false);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);

  const loadForm = async (taskId: string) => {
    try {
      const fetchedForm = await fetchTaskForm({
        taskId: taskId,
      });
      setForm(fetchedForm);
      initFormValues(fetchedForm);
    } catch (error) {
      toast.error("Failed to fetch form");
    }
  };

  const initFormValues = (fetchedForm: Form) => {
    const formValues: any = {};
    fetchedForm.fields.forEach((field, index) => {
      if (index != 0 && !field.readOnly) {
        if (field.type === "boolean") {
          formValues[field.id] = field.value || false;
        } else {
          formValues[field.id] = field.value || "";
        }
      }
    });
    setFormValues(formValues);
  };

  // Handle input change for text fields
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldId: string
  ) => {
    const { value } = event.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  };

  // Handle input change for text fields
  const handleCheckboxChange = (checked: boolean, fieldId: string) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [fieldId]: checked,
    }));
  };

  // Handle select change for dropdowns
  const handleSelectChange = (
    event: SelectChangeEvent<any>,
    fieldId: string
  ) => {
    const value = event.target.value as string;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formValues);
    try {
      await postTaskForm({ taskId: selected, formValues: formValues });
      toast.success("Submit form success");
      loadTasks();
      setShowPopUp(false);
    } catch (error) {
      console.log(error);
      toast.error("Submit process failed");
    }
  };

  if (loadingTasks) {
    return (
      <Typography sx={{ textAlign: "center", my: 2 }}>Loading...</Typography>
    );
  }

  if (tasks.length === 0) {
    return <Typography sx={{ textAlign: "center", my: 2 }}>No data</Typography>;
  }

  return (
    <>
      <Dialog open={showPopUp} onClose={() => setShowPopUp(false)}>
        <DialogContent>
          {form && (
            <Box component="form" sx={{ p: 2, backgroundColor: "white" }}>
              {form.fields.map((field) => {
                if (field.type == "text" || field.type == "integer") {
                  return (
                    <TextField
                      required={field.required}
                      key={field.id}
                      label={field.name}
                      sx={{ mb: 2, color: "black" }}
                      disabled={field.readOnly}
                      value={field.value || formValues[field.id] || ""}
                      onChange={(event) => handleInputChange(event, field.id)}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={field.type == "integer" ? "number" : "text"}
                    />
                  );
                } else if (field.type == "boolean") {
                  return (
                    <FormControlLabel
                      label={field.name}
                      control={
                        <Checkbox
                          disabled={field.readOnly}
                          checked={field.value || formValues[field.id] || false}
                          onChange={(_, checked) =>
                            handleCheckboxChange(checked, field.id)
                          }
                        />
                      }
                    />
                  );
                } else if (field.type == "dropdown" && "options" in field) {
                  return (
                    <FormControl
                      disabled={field.readOnly}
                      required={field.required}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        {field.name}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label={field.name}
                        id="demo-simple-select"
                        value={field.value || formValues[field.id] || ""}
                        onChange={(event) =>
                          handleSelectChange(event, field.id)
                        }
                      >
                        {field.options?.map((option, index) => {
                          return index == 0 ? (
                            <></>
                          ) : (
                            <MenuItem key={option.id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  );
                } else if (
                  field.type == "radio-buttons" &&
                  "options" in field
                ) {
                  return (
                    <FormControl
                      disabled={field.readOnly}
                      required={field.required}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        {field.name}
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={field.value || formValues[field.id] || ""}
                        onChange={(event) => handleInputChange(event, field.id)}
                      >
                        {field.options?.map((option, index) => {
                          return index == 0 ? (
                            <></>
                          ) : (
                            <FormControlLabel
                              key={option.id}
                              value={option.name}
                              control={<Radio />}
                              label={option.name}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  );
                } else {
                  return (
                    <Typography
                      fontSize={24}
                      fontWeight={"bold"}
                      key={field.id}
                    >
                      {field.name}
                    </Typography>
                  );
                }
              })}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            onClick={() => setShowPopUp(false)}
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ flexGrow: 1, mx: 0 }}>
        <Typography variant="h4" sx={{ flexGrow: 1, my: 2, mx: 2 }}>
          Task
        </Typography>
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={3} key={task.id}>
              <Card
                sx={{
                  backgroundColor: "background.paper",
                  color: "black",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{task.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {task.description}
                  </Typography>
                  <Typography variant="subtitle1">
                    {"task id: " + task.id}
                  </Typography>
                  <Typography variant="subtitle1">
                    {"assignee to: " + task.assignee}
                  </Typography>

                  <CardActions>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        setShowPopUp(true);
                        setSelected(task.id);
                        loadForm(task.id);
                      }}
                      size="small"
                      sx={{ color: "white" }}
                    >
                      Claim
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default TaskPage;
