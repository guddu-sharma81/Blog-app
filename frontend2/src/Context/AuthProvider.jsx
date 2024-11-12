import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookies";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [blog, setBlogs] = useState();
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let token = localStorage.getItem("jwt");
                console.log(token);
                if (token) {

                    const { data } = await axios.get(
                        "http://localhost:4001/api/users/my-profile",
                        {
                            withCredentials: true,
                            headers: { "content-type": "application/json" }
                        }
                    );
                    console.log(data);
                    setProfile(data);
                    setIsAuthenticated(true);
                }

            } catch (error) {
                console.log(error);
            }
        };

        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4001/api/blogs/all-blogs",
                    { withCredentials: true }
                );
                console.log(data);
                setBlogs(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                blog,
                profile,
                isAuthenticated,
                setIsAuthenticated,
                setProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
