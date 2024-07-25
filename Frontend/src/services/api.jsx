import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getTasks = () => {
  const getTask = api.get("/get_tasks/");
  return getTask;
};

export const createTasks = (task) => {
  const createTasks = api.post("/create_tasks", task);
  return createTasks;
};
export const deleteTask = () => {};

export default api;
