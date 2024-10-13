import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../services/security-service"; // Your authentication service

const Login = ({ onLoginSuccess }) => {
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (user) => {
    const authenticationResult = await authenticateUser(user);
    if (authenticationResult.success === true) {
      sessionStorage.setItem("token", authenticationResult.token);
      sessionStorage.setItem("role", authenticationResult.role);
      onLoginSuccess(); // Notify parent component of successful login
      navigate("/home"); // Redirect to home
    } else {
      setAuthErrorMessage(authenticationResult.message);
      setTimeout(() => {
        setAuthErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-136px)] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-start">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.email && <p className="text-red-500">Email is required and must be valid.</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-start">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && <p className="text-red-500">Password is required and must be at least 6 characters.</p>}
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="w-full mx-28 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
