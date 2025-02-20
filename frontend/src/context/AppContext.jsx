import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    axios.defaults.withCredentials = true;

    const checkAuth = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
                withCredentials: true
                
            });
            if (data.success) {
                setIsLoggedin(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, {
                withCredentials: true
            });
            if (data.success) setUserData(data.userData);
            else toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AppContent.Provider value={{ backendUrl, isLoggedin, setIsLoggedin, userData, setUserData, getUserData }}>
            {props.children}
        </AppContent.Provider>
    );
};
