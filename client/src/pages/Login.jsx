import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="auth flex items-center justify-center h-[100vh] bg-lightGreen flex-col">
      <h1 className="text-[20px] text-teal-500 mb-[20px]">LOGIN</h1>
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
          type="password"
          placeholder="Password"
          name="password"
          className="border-b border-gray-500 p-[10px]"
          onChange={handleChange}
        />
        <button
          className="p-[10px] border-none bg-teal-800 cursor-pointer text-white"
          onClick={handleSubmit}
        >
          Login
        </button>
        {err && <p className="text-[12px] text-red-600 text-center">{err}</p>}
        <span className="text-[12px] text-center">
          Don’t have an account?
          <Link to="/register" className="text-blue-600">
            {" "}
            Register{" "}
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
