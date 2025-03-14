import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      let response;
      if (state === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        setIsLoggedin(true);
        if (response.data.user) {
          toast.success(`Welcome ${response.data.user.name}! Account created successfully.`);
        } else {
          toast.success('Login successful!');
        }
        await getUserData();
        navigate("/");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen auth-gradient px-4">
      <div className="container max-w-md mx-auto relative">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        />

        <div className="glass-card p-8 rounded-2xl shadow-xl w-full mt-20">
          <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {state === "Sign Up" ? "Create Account" : "Login "}
          </h2>
          <p className="text-center text-sm mb-6">
            {state === "Sign Up"
              ? "Create your account"
              : "Login to your account"}
          </p>

          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Full name"
                  required
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white bg-opacity-5 rounded-xl px-4 py-3">
                <img
                  src={assets.mail_icon}
                  alt=""
                  className="w-5 h-5 opacity-70"
                />
                <input
                  type="email"
                  placeholder="Email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent outline-none text-white w-full placeholder-gray-300"
                />
              </div>

              <div className="flex items-center gap-3 bg-white bg-opacity-5 rounded-xl px-4 py-3">
                <img
                  src={assets.lock_icon}
                  alt=""
                  className="w-5 h-5 opacity-70"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent outline-none text-white w-full placeholder-gray-300"
                />
              </div>
            </div>

            <p
              onClick={() => navigate("/reset-password")}
              className="mt-4 text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors"
            >
              Forgot Password?
            </p>

            <button type="submit" className="primary-button w-full mt-6">
              {state}
            </button>

            
            <div 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 bg-white bg-opacity-10 rounded-xl px-4 py-3 mt-4 cursor-pointer hover:bg-opacity-20 transition-colors"
            >
              <img 
                src={assets.google_icon} 
                alt="Google Login" 
                className="w-6 h-6"
              />
              <span className="text-white">
                Continue with Google
              </span>
            </div>
          </form>
          

          <p className="text-gray-300 text-center text-sm mt-6">
            {state === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              onClick={() =>
                setState(state === "Sign Up" ? "Login" : "Sign Up")
              }
              className="text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors"
            >
              {state === "Sign Up" ? "Login here" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;