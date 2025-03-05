import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useEffect, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    axios.defaults.withCredentials = true;

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, {
                withCredentials: true
            });
            if (data.success) {
                setUserData(data.userData);
                return data.userData;
            }
            toast.error(data.message);
            return null;
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    };


    return (
        <AppContent.Provider value={{ backendUrl, isLoggedin, setIsLoggedin, userData, setUserData, getUserData }}>
            {props.children}
        </AppContent.Provider>
    );
};
