import { useState } from "react";
import { createTask } from "../services/api";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      task,
      date,
    };

    try {
      await createTask(newTask);
      setTask("");
      setDate("");
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task</label>
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div>
        <label>date</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
