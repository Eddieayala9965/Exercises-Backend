import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../services/api";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

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

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <Container sx={{ marginTop: 7 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      {tasks.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" component="p">
            No Tasks Available, Create Task
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create_task"
          >
            Create Task
          </Button>
        </Box>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} divider>
              <ListItemText
                primary={task.name}
                secondary={new Date(task.date).toLocaleDateString()}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleClickOpen(task)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Task Name"
              type="text"
              fullWidth
              value={currentTask.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="date"
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={currentTask.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default TaskList;
