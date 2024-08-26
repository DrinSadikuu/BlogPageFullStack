import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use environment variable for the API URL
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        inputs,
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }
  };

  return (
    <div className="auth flex items-center justify-center h-[100vh] bg-lightGreen flex-col">
      <h1 className="text-[20px] text-teal-500 mb-[20px]">REGISTER</h1>
      <form className="flex flex-col p-[50px] w-[350px] gap-[20px] bg-white">
        <input
          required
          type="text"
          name="username"
          placeholder="Username"
          className="border-b border-gray-500 p-[10px]"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="border-b border-gray-500 p-[10px]"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          className="border-b border-gray-500 p-[10px]"
          onChange={handleChange}
        />
        <button
          className="p-[10px] border-none bg-teal-800 cursor-pointer text-white"
          onClick={handleSubmit}
        >
          Register
        </button>
        {err && <p className="text-[12px] text-red-600 text-center">{err}</p>}
        <span className="text-[12px] text-center">
          Do you have an account?
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
