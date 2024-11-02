import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, getTaskById } from "../../services/taskService";

const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(taskId);
        const startDate = data.startDate.split("T")[0];
        const endDate = data.endDate.split("T")[0];
        setTask({ ...data, startDate, endDate });
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editTask(taskId, task);
      navigate(`/projects/${task.projectId}`);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='taskName'
          value={task.taskName}
          onChange={handleChange}
          required
        />
        <textarea
          name='description'
          value={task.description}
          onChange={handleChange}
        ></textarea>
        <input
          type='date'
          name='startDate'
          value={task.startDate}
          onChange={handleChange}
          required
        />
        <input
          type='date'
          name='endDate'
          value={task.endDate}
          onChange={handleChange}
          required
        />
        <select name='priority' value={task.priority} onChange={handleChange}>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
        <select name='status' value={task.status} onChange={handleChange}>
          <option value='Not Started'>Not Started</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <button type='submit'>Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
