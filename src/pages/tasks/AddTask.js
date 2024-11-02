import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTask } from "../../services/taskService";
import { getUsers } from "../../services/userService";

const AddTask = () => {
  const { projectId } = useParams();
  const [task, setTask] = useState({
    taskName: "",
    description: "",
    assignedToId: "",
    startDate: "",
    endDate: "",
    priority: "Low",
    status: "Not Started",
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({ ...task, projectId });
      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='taskName'
          placeholder='Task Name'
          onChange={handleChange}
          value={task.taskName}
          required
        />
        <textarea
          name='description'
          placeholder='Description'
          onChange={handleChange}
          value={task.description}
        ></textarea>
        <select
          name='assignedToId'
          value={task.assignedToId}
          onChange={handleChange}
          required
        >
          <option value=''>Select User</option>
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.username}
            </option>
          ))}
        </select>
        <input
          type='date'
          name='startDate'
          onChange={handleChange}
          value={task.startDate}
          required
        />
        <input
          type='date'
          name='endDate'
          onChange={handleChange}
          value={task.endDate}
          required
        />
        <select name='priority' onChange={handleChange} value={task.priority}>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
        <select name='status' onChange={handleChange} value={task.status}>
          <option value='Not Started'>Not Started</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <button type='submit'>Create Task</button>
      </form>
    </div>
  );
};

export default AddTask;
