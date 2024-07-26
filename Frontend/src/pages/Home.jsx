import { Container, Box } from "@mui/material";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <Container>
      <Box my={4}>
        <TaskList />
      </Box>
    </Container>
  );
};

export default Home;
