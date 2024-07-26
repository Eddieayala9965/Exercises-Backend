import { useState } from "react";
import { createTask } from "../services/api";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
