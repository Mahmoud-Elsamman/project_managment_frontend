import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProjects, deleteProject } from "../../services/projectService";
import { getCurrentUser } from "../../services/authService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError("Could not load projects.");
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      setProjects(
        projects.filter((project) => project.projectId !== projectId)
      );
    } catch (err) {
      setError("Could not delete project.");
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user.role === "Manager" && (
        <button onClick={() => navigate("/projects/new")}>Add Project</button>
      )}

      {projects.length == 0 && <p>No projects found.</p>}

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
