import { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

    const sendVerificationOtp = async () => {
      try {
        axios.defaults.withCredentials = true
        const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
        if(data.success) {
          navigate('/email-verify')
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
        
      } catch (error) {
        toast.error(error.message); 
      }  
    }

    const logout = async () => {
      try {
        axios.defaults.withCredentials = true
        const { data } = await axios.post(backendUrl + "/api/auth/logout");
       data.success && setIsLoggedin(false)
       data.success && setUserData(false)
       navigate('/')

      } catch (error) {
        toast.error(error.message);
    }
    };

  return (
    <div className="w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />
        
        {userData ? (
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 
              to-purple-500 flex items-center justify-center text-white font-medium 
              shadow-lg hover:shadow-xl transition-all cursor-pointer">
              {userData.name[0].toUpperCase()}
            </div>
            
            <div className="absolute hidden group-hover:block right-0 pt-2 w-48">
              <div className="glass-card rounded-xl shadow-lg py-1">
                {!userData.isAccountVerified && (
                  <button
                    onClick={sendVerificationOtp}
                    className="w-full px-4 py-2 text-left text-gray-200 hover:bg-white hover:bg-opacity-5 transition-colors"
                  >
                    Verify email
                  </button>
                )}
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-gray-200 hover:bg-white hover:bg-opacity-5 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 glass-card px-6 py-2 rounded-xl text-white 
              hover:bg-white hover:bg-opacity-20 transition-all"
          >
            Login <img src={assets.arrow_icon} alt="" className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
