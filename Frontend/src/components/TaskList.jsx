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
import EditIcon from "@mui/icon-material/Edit"

const TaskList = () => {
  const [tasks, setTask] = useState([]);
  const [open, setOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState({
    id: "", name: "", date: "" 
  })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
  }, []);

  const handleClickOpen = (task) => {
    setCurrentTask(task)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentTask({
      id: "", name: "", date: ""
    })
  }

  const handleChange = (e) => {
    setCurrentTask({...currentTask, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      await updateTask()
    } catch(error) {
      console.error("Error updating task: ", error)
    }
  }
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.name}
              secondary={new Date(task.date).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
export default TaskList;
