import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectTasks, deleteTask } from "../services/taskService";
import { useAuth } from "../context/AuthContext";

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectTasks();
  }, []);

  const fetchProjectTasks = async () => {
    const data = await getProjectTasks(id, user);
    setTasks(data);
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    fetchProjectTasks();
  };

  return (
    <div>
      <h1>Project Tasks</h1>
      {user.role === "Manager" && (
        <button onClick={() => navigate(`/projects/${id}/tasks/new`)}>
          Add Task
        </button>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            <span>{task.taskName}</span>
            {user.role === "Manager" || task.assignedTo === user.username ? (
              <>
                <button onClick={() => navigate(`/tasks/edit/${task.taskId}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(task.taskId)}>
                  Delete
                </button>
              </>
            ) : null}
          </li>
        ))}
      </ul>
      <Link to='/projects'>Back to Projects</Link>
    </div>
  );
};

export default ProjectDetails;
