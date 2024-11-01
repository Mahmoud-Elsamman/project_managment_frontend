import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <PrivateRoute
          path='/projects'
          component={Projects}
          roles={["Manager", "Employee"]}
        />
        <PrivateRoute
          path='/projects/:id'
          component={ProjectDetails}
          roles={["Manager", "Employee"]}
        />
        <Route path='/' element={<h2>Welcome to Project Management App</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
