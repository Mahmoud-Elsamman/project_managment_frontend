import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, editProject } from "../../services/projectService";

const EditProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(projectId);
      const startDate = data.startDate.split("T")[0];
      const endDate = data.endDate.split("T")[0];
      setProject({ ...data, startDate, endDate });
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProject(projectId, project);
      navigate("/projects");
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='projectName'
          value={project.projectName}
          onChange={handleChange}
          required
        />
        <textarea
          name='description'
          value={project.description}
          onChange={handleChange}
        ></textarea>
        <input
          type=''
          name='startDate'
          value={project.startDate}
          onChange={handleChange}
          required
        />
        <input
          type='date'
          name='endDate'
          value={project.endDate}
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='budget'
          value={project.budget}
          onChange={handleChange}
        />
        <select name='status' value={project.status} onChange={handleChange}>
          <option value='Not Started'>Not Started</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <button type='submit'>Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
