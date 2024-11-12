import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";



const Sidebar = ({ setComponate }) => {
    const { profile, setIsAuthenticated } = useAuth()
    console.log(profile);
    const naviagte = useNavigate();

    const [show, setShow] = useState(false);

    const handleComponate = (value) => {
        setComponate(value)
    }
    const goToHome = () => {
        naviagte("/")
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get("http://localhost:4001/api/users/logout", { withCredentials: true });
            setIsAuthenticated(false);

            toast.success("Logged out successfully")

        } catch (error) {
            console.log(error);
            toast.error(error.message || "User Logout failed");

        }
    }


    return (

        <>

            <div className='sm:hidden fixed top-4 left-4 z-50' onClick={() => setShow(!show)}>
                <CiMenuBurger className='text-2xl' />
            </div>

            <div className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"} `}>


                <div className='sm:hidden absolute top-4 right-4 text-xl cursor-pointer
                ' onClick={() => setShow(!show)}>
                    <BiSolidLeftArrowAlt className='text-2xl' />

                </div>

                <div className='text-center'>
                    <img src={profile?.photo?.url} alt="" className='w-24 h-24 rounded-full mx-auto mb-2 my-2' />
                    <p className='text-lg font-semibold '>{profile?.name}</p>
                </div>

                <ul className='space-y-6 mx-6'>
                    <button onClick={() => handleComponate("My Blogs")} className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300'>MY BLOGS</button>

                    <button onClick={() => handleComponate("Create Blog")} className='w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300'>CREATE BLOGS</button>

                    <button onClick={() => handleComponate("My Profile")} className='w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300'>MY PROFILE</button>

                    <button onClick={goToHome} className='w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300'>HOME</button>

                    <button onClick={handleLogout} className='w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300'>LOGOUT</button>
                </ul>
            </div>
        </>
    )
}

export default Sidebar
