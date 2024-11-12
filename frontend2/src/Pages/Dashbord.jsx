import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import Sidebar from '../dashboard/Sidebar';
import MyProfile from '../dashboard/MyProfile'
import CreateBlog from '../dashboard/CreateBlog'
import UpdateBlog from '../dashboard/UpdateBlog'
import MyBlogs from '../dashboard/MyBlogs'
import { Navigate } from 'react-router-dom';


const Dashbord = () => {
    const { profile, isAuthenticated } = useAuth()
    const [componate, setComponate] = useState("My Blogs")

    if (!isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div>
            <Sidebar componate={componate} setComponate={setComponate} />
            {componate === "My Profile" ? (<MyProfile />) : componate === "Create Blog" ? (<CreateBlog />) : componate === "Update Blog" ? (<UpdateBlog />) : (<MyBlogs />)}
        </div>
    )
}

export default Dashbord
