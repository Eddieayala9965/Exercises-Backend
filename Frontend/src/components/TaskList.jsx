import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
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
  Box,
} from "@mui/material";

const TaskList = () => {
  const [tasks, setTask] = useState([]);

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
