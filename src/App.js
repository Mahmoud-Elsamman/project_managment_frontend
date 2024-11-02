import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Projects from "./pages/projects/Projects";
import Task from "./pages/tasks/TaskList";
import PrivateRoute from "./components/PrivateRoute";
import EditProject from "./pages/projects/EditProject";
import AddTask from "./pages/tasks/AddTask";
import EditTask from "./pages/tasks/EditTask";
import Register from "./pages/auth/Register";
import AddProject from "./pages/projects/AddProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/register'
          element={
            <PrivateRoute roles={["Manager"]}>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path='/projects'
          element={
            <PrivateRoute roles={["Manager", "Employee"]}>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path='/projects/new'
          element={
            <PrivateRoute roles={["Manager"]}>
              <AddProject />
            </PrivateRoute>
          }
        />
        <Route
          path='/projects/edit/:projectId'
          element={
            <PrivateRoute roles={["Manager"]}>
              <EditProject />
            </PrivateRoute>
          }
        />
        <Route
          path='/projects/:projectId'
          element={
            <PrivateRoute roles={["Manager", "Employee"]}>
              <Task />
            </PrivateRoute>
          }
        />
        <Route
          path='/projects/:projectId/tasks'
          element={
            <PrivateRoute roles={["Manager", "Employee"]}>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path='/tasks/edit/:taskId'
          element={
            <PrivateRoute roles={["Manager", "Employee"]}>
              <EditTask />
            </PrivateRoute>
          }
        />

        <Route path='/' element={<h2>Welcome to Project Management App</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
