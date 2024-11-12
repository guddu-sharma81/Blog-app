import mongoose from "mongoose";
import { Blog } from "../models/blogModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Create API
export const createBlog = async (req, res) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "Blog photo is required" });
        }

        const { blogImage } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({
                message: "Invalid photo format. Only jpg and png are allowed",
            });
        }

        const { title, category, about } = req.body;
        if (
            !title || !category || !about) {
            return res.status(400).json({ message: "Title, Category and About is required" });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;
        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
        }

        const blogData = {
            title,
            about,
            category,
            adminName,
            adminPhoto,
            createdBy,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        }

        const blog = await Blog.create(blogData);

        return res.status(201).json({ meassge: "Blog created successfuly", blog });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }

}

// Delete API
export const deleteBlog = async (req, res) => {
    try {

        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await blog.deleteOne();
        return res.status(200).json({ message: "Blog deleted successfuly" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })

    }
}

// Get All Data

export const getAllBlogs = async (rew, res) => {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
}

// Get single data

export const getSingleBlogs = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is not valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog id" });
        }

        // Await the blog retrieval
        const blog = await Blog.findById(id);

        // Check if the blog was found
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Return the found blog
        res.status(200).json(blog);
    } catch (error) {
        console.error(error); // Use console.error for better visibility of errors
        res.status(500).json({ error: "Internal server problem" });
    }
};

// Admin blogs

export const getMyBlogs = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const myBlog = await Blog.find({ createdBy });
        res.status(200).json(myBlog);
    } catch (error) {
        console.log(error);
        res.status(400).json({ meassge: "Internal Server error" });
    }
}

// Update API

export const updateBlogs = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invaild blog Id" });
    }
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateBlog) {
        return res.status(404).json({ meassge: "Blog not found" });
    }
    res.status(200).json(updateBlog);
}


