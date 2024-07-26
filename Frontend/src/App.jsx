import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/create_task"
        element={
          <Layout>
            <CreateTask />
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default App;
