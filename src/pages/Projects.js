import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleDelete = async (projectId) => {
    await deleteProject(projectId);
    fetchProjects();
  };

  return (
    <div>
      <h1>Projects</h1>
      {user.role === "Manager" && (
        <button onClick={() => navigate("/projects/new")}>Add Project</button>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project.projectId}>
            <Link to={`/projects/${project.projectId}`}>
              {project.projectName}
            </Link>
            {user.role === "Manager" && (
              <>
                <button
                  onClick={() =>
                    navigate(`/projects/edit/${project.projectId}`)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(project.projectId)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
