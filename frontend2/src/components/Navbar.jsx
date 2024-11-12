import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';
const Navbar = () => {

    const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
    console.log(profile);

    const navigate = useNavigate();


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

    const { blog } = useAuth();
    console.log(blog);

    const [showMenu, setShowMenu] = useState(false);


    return (
        <>
            <nav className='shadow-lg py-4 px-2'>
                <div className='flex items-center justify-between container mx-auto'>
                    <div className='font-semibold text-xl'>
                        Guddu<span className='text-blue-600'>Blogs</span>
                    </div>
                    {/* desktop menu */}
                    <div className='mx-4'>
                        <ul className='hidden md:flex flex space-x-9 font-semibold'>
                            <Link to="/" className=' hover:text-blue-600 duration-200'>HOME</Link>
                            <Link to="/about" className=' hover:text-blue-600 duration-200'>ABOUT</Link>
                            <Link to="/blogs" className=' hover:text-blue-600 duration-200'>BLOG</Link>
                            <Link to="/creaters" className=' hover:text-blue-600 duration-200'>CREATORS</Link>
                            <Link to="/contact" className=' hover:text-blue-600 duration-200'>CONTACT</Link>
                        </ul>

                        <div className='md:hidden' onClick={() => setShowMenu(!showMenu)}>
                            {showMenu ? <IoCloseSharp size={24} /> : <IoMdMenu size={24} />}
                        </div>

                    </div>
                    <div className='space-x-3 flex'>

                        {isAuthenticated && profile?.role === "admin" ? (
                            <Link to={"/dashbord"} className='bg-blue-600 text-white font-semibold  hover:bg-blue-800 duration-300 rounded-md py-2 px-3'>DASHBORD</Link>

                        ) : ("")}

                        {!isAuthenticated ? (
                            <Link to={"/login"} className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 rounded-md py-2 px-3'>LOGIN</Link>
                        ) : (<div>
                            <button onClick={handleLogout}
                                className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 rounded-md py-2 px-3'>
                                LOGOUT
                            </button>

                        </div>)}

                    </div>
                </div>

                {/* mobail view */}

                {
                    showMenu && (
                        <div className='bg-white '>
                            <ul className='flex md:hidden h-screen justify-center space-y-3 text-center py-3 font-semibold flex-col'>
                                <Link to="/" onClick={() => setShowMenu(!showMenu)} smooth="true" duration={500} offset={-70} activeClass="active" className=' hover:text-blue-600 duration-200 '>HOME</Link>
                                <Link to="/about" onClick={() => setShowMenu(!showMenu)} smooth="true" duration={500} offset={-70} activeClass="active" className=' hover:text-blue-600 duration-200 '>ABOUT</Link>
                                <Link to="/blogs" onClick={() => setShowMenu(!showMenu)} smooth="true" duration={500} offset={-70} activeClass="active" className=' hover:text-blue-600 duration-200 '>BLOG</Link>
                                <Link to="/creaters" onClick={() => setShowMenu(!showMenu)} smooth="true" duration={500} offset={-70} activeClass="active" className=' hover:text-blue-600 duration-200 '>CREATORS</Link>
                                <Link to="/contact" onClick={() => setShowMenu(!showMenu)} smooth="true" duration={500} offset={-70} activeClass="active" className=' hover:text-blue-600 duration-200'>CONTACT</Link>
                            </ul>
                        </div>
                    )
                }
            </nav >
        </>
    )
}

export default Navbar
