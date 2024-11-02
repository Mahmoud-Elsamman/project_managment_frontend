import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../services/projectService";
import { getCurrentUser } from "../../services/authService";

const AddProject = () => {
  const [project, setProject] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: 0,
    status: "Not Started",
  });
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProject({ ...project, ownerId: user.id });
      navigate("/projects");
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='projectName'
          placeholder='Project Name'
          onChange={handleChange}
          value={project.projectName}
          required
        />
        <textarea
          name='description'
          placeholder='Description'
          value={project.description}
          onChange={handleChange}
        ></textarea>
        <input
          type='date'
          name='startDate'
          onChange={handleChange}
          value={project.startDate}
          required
        />
        <input
          type='date'
          name='endDate'
          onChange={handleChange}
          value={project.endDate}
          required
        />
        <input
          type='number'
          name='budget'
          placeholder='Budget'
          value={project.budget}
          onChange={handleChange}
        />
        <select name='status' value={project.status} onChange={handleChange}>
          <option value='Not Started'>Not Started</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
        <button type='submit'>Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;
