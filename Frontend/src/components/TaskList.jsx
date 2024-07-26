import { useEffect, useState } from "react";
import { getTasks, updateTask } from "../services/api";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: "",
    name: "",
    date: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
  }, []);

  const handleClickOpen = (task) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask({
      id: "",
      name: "",
      date: new Date(),
    });
  };

  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTask(currentTask.id, currentTask);
      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? response.data : task))
      );
      handleClose();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };
  return (
    <Container sx={{ marginTop: 7 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.name}
              secondary={new Date(task.date).toLocaleString()}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleClickOpen(task)}
              >
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Task"
            name="name"
            value={currentTask.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            label="Date"
            type="date"
            name="date"
            value={currentTask.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default TaskList;
