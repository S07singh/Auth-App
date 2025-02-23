import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const ResetPassword = () => {
  const {backendUrl} = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value)
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
  
    if (!email || !otp || !newPassword) {
      toast.error("Missing required fields.");
      return;
    }
  
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
  
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen auth-gradient px-4">
      <div className="container max-w-md mx-auto relative">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        />

        {/* email input form */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="glass-card p-8 rounded-2xl shadow-xl w-full mt-20">
            <h1 className="text-2xl font-semibold text-white text-center mb-4">
              Reset Password
            </h1>
            <p className="text-center mb-6 text-gray-300">
              Enter your registered email address
            </p>
            <div className="flex items-center gap-3 bg-white bg-opacity-5 rounded-xl px-4 py-3">
              <img src={assets.mail_icon} alt="" className="w-5 h-5 opacity-70" />
              <input
                type="email"
                placeholder="Email id"
                className="bg-transparent outline-none text-white w-full placeholder-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="primary-button w-full mt-6">
              Submit
            </button>
          </form>
        )}

        {/* OTP input form */}
        {!isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitOtp} className="glass-card p-8 rounded-2xl shadow-xl w-full mt-20">
            <h1 className="text-2xl font-semibold text-white text-center mb-4">
              Reset Password OTP
            </h1>
            <p className="text-center mb-6 text-gray-300">
              Enter the 6-digit OTP sent to your email
            </p>
            <div className="flex justify-between gap-2 mb-8" onPaste={handlePaste}>
              {Array(6).fill(0).map((_, index) => (
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
              Submit
            </button>
          </form>
        )}

        {/* New password form */}
        {isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} className="glass-card p-8 rounded-2xl shadow-xl w-full mt-20">
            <h1 className="text-2xl font-semibold text-white text-center mb-4">
              New Password
            </h1>
            <p className="text-center mb-6 text-gray-300">Enter a new password</p>
            <div className="flex items-center gap-3 bg-white bg-opacity-5 rounded-xl px-4 py-3">
              <img src={assets.lock_icon} alt="" className="w-5 h-5 opacity-70" />
              <input
                type="password"
                placeholder="Please enter a new password"
                className="bg-transparent outline-none text-white w-full placeholder-gray-300"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="primary-button w-full mt-6">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
