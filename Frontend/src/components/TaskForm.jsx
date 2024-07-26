import { useState } from "react";
import { createTask } from "../services/api";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const TaskForm = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      name,
      date,
    };

    try {
      await createTask(newTask);
      setName("");
      setDate("");
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Task"
          name="name"
          autoComplete="task-name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="date"
          label="Date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Task
        </Button>
      </Box>
    </Container>
  );
};

export default TaskForm;
