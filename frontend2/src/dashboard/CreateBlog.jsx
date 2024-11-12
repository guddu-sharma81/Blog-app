import React, { useState } from 'react'
import toast from "react-hot-toast";
import axios from "axios";

const CreateBlog = () => {

    const [title, setTitle] = useState("");
    const [category, setCatagery] = useState("");
    const [about, setAbout] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogImagePreview, setBlogImagePreview] = useState("");

    const changeBlogImageHandler = (e) => {
        console.log(e);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBlogImagePreview(reader.result);
            setBlogImage(file);
        };
    };

    const handleBlogCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("about", about);
        formData.append("blogImage", blogImage);
        try {
            const { data } = await axios.post(
                "http://localhost:4001/api/blogs/create",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(data);
            localStorage.setItem("jwt", data.token);
            toast.success("Blog Created successfully");
            setTitle("");
            setAbout("");
            setCatagery("");
            setBlogImage("");
            setBlogImagePreview("");

        } catch (error) {
            console.log(error);
            toast.error(error.message || "Failed to create blog");
        }
    };

    return (
        <div>
            <div className="min-h-screen py-10">
                <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg">

                    <h1 className="text-xl font-semibold mb-8">Create Blogs</h1>
                    <form onSubmit={handleBlogCreate} className='space-y-6'>
                        <div className='space-y-2'>
                            <label className='block text-lg'>Categery</label>
                            <select
                                value={category}
                                onChange={(e) => setCatagery(e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-400 outline-none rounded-md"
                            >
                                <option value="">Select Category</option>
                                <option value="Devotional">Devotional</option>
                                <option value="Coding">Coding</option>
                                <option value="Sports">Sports</option>
                                <option value="Music">Music</option>
                                <option value="Entertaiment">Entertaiment</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className='block text-lg'>Title</label>
                            <input
                                type="text"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2  border border-gray-400 rounded-lg outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className='block text-lg'>Blog Image</label>
                            <div className="flex items-center justify-center">
                                <div className="photo w-40 h-40 mr-4">
                                    <img
                                        src={blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"}
                                        alt=""
                                    />
                                </div>
                                <input
                                    type="file"
                                    onChange={changeBlogImageHandler}
                                    className="w-full px-3 py-2  border border-gray-400 rounded-lg outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className='block text-lg'>About</label>
                            <textarea
                                type="text"
                                placeholder="Write something your blogs"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="w-full p-2  border rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
                        >
                            Post Blog
                        </button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default CreateBlog
