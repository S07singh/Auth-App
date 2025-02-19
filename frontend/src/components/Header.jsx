import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { userData } = useContext(AppContent);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 relative z-10">
            {/* Modern Avatar/Logo */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50"></div>
                <img
                    className="w-36 h-36 rounded-full shadow-2xl relative
                    ring-4 ring-white/10 transform hover:scale-105 transition-all duration-300"
                    src={assets.header_img}
                    alt="Auth Logo"
                />
            </div>
            
            {/* Welcome Text */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-5xl sm:text-6xl font-bold">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 
                        bg-clip-text text-transparent">
                        Hey {userData ? userData.name : 'Developer'}!
                    </span>
                </h1>

                <h2 className="text-3xl sm:text-4xl font-semibold text-white/90">
                    Welcome to MyAuth
                </h2>
                
                <p className="max-w-md text-gray-300 text-lg">
                    Secure authentication using JWT and OAuth2.0
                </p>
            </div>

            {/* Get Started Button */}
            <button 
                onClick={() => navigate("/login")}
                className="group relative inline-flex items-center justify-center px-8 py-3
                overflow-hidden font-medium transition duration-300 ease-out border-2 
                border-white border-opacity-20 rounded-full shadow-md
                bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm
                hover:border-opacity-50 hover:from-blue-600/20 hover:to-purple-600/20"
            >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full
                    text-white duration-300 -translate-x-full bg-gradient-to-r from-blue-600 
                    to-purple-600 group-hover:translate-x-0 ease">
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full
                    text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Get Started
                </span>
                <span className="relative invisible">Get Started</span>
            </button>
        </div>
    );
};

export default Header;
