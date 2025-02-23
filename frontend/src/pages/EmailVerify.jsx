import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeydown = (e, index) => {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = ""; // Clear previous input
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      if (otp.length !== 6) {
        toast.error("Please enter the full 6-digit OTP.");
        return;
      }

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen auth-gradient px-4">
      <div className="container max-w-md mx-auto relative">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        />

        <form
          onSubmit={onSubmitHandler}
          className="glass-card p-8 rounded-2xl shadow-xl w-full mt-20"
        >
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            Email Verify OTP
          </h1>
          <p className="text-center mb-8 text-gray-300">
            Please enter the OTP sent to your email
          </p>

          <div
            className="flex justify-between gap-2 mb-8"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  className="w-12 h-12 text-center text-xl font-bold rounded-xl 
                  bg-white bg-opacity-5 border border-gray-200 border-opacity-20 
                  focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-white"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeydown(e, index)}
                />
              ))}
          </div>

          <button type="submit" className="primary-button w-full">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
