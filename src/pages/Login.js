import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { login } from "../services/auth";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", credentials);
      login(response.data.token);
      navigate("/projects");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
          placeholder='Username'
          required
        />
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
        {error && <p>{error}</p>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
