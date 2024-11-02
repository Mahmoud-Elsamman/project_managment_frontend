import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectTasks, deleteTask } from "../../services/taskService";
import { getCurrentUser } from "../../services/authService";

const Task = ({}) => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getProjectTasks(projectId, user);
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.taskId !== taskId));
  };

  return (
    <div>
      <h1>Tasks for Project {projectId}</h1>
      {user.role === "Manager" && (
        <button onClick={() => navigate(`/projects/${projectId}/tasks`)}>
          Add Task
        </button>
      )}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.taskId}
            className={task.isOverdue ? "overdue-task" : ""}
          >
            <h3>
              {task.taskName}
              {task.isOverdue && (
                <span className='overdue-indicator'>Overdue</span>
              )}
            </h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            {user.role === "Manager" || task.assignedTo === user.username ? (
              <>
                <button onClick={() => navigate(`/tasks/edit/${task.taskId}`)}>
                  Edit
                </button>
                {user.role === "Manager" && (
                  <button onClick={() => handleDelete(task.taskId)}>
                    Delete
                  </button>
                )}
              </>
            ) : null}
          </li>
        ))}
      </ul>
      <Link to='/projects'>Back to Projects</Link>
    </div>
  );
};

export default Task;
