import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTask, editTask } from "../services/taskService";

const TaskForm = ({ projectId, task = null, isEditing = false }) => {
  const [taskName, setTaskName] = useState(task ? task.taskName : "");
  const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { taskName, assignedTo };
    if (isEditing) {
      await editTask(task.taskId, taskData);
    } else {
      await addTask(projectId, taskData);
    }
    navigate(`/projects/${projectId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Task Name</label>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <label>Assigned To</label>
      <input
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
      />
      <button type='submit'>{isEditing ? "Update" : "Create"} Task</button>
    </form>
  );
};

export default TaskForm;
