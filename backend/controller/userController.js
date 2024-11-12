import { User } from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookies from '../jwt/authUser.js';

export const register = async (req, res) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "User photo is required" });
        }
        const { photo } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({
                message: "Invalid photo format. Only jpg and png are allowed",
            });
        }

        const { email, name, password, phone, education, role } = req.body;
        if (
            !email ||
            !name ||
            !password ||
            !phone ||
            !education ||
            !role ||
            !photo
        ) {
            return res.status(400).json({ message: "Please fill required fields" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists with this email" });
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            name,
            password: hashPassword,
            phone,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });

        await newUser.save();

        if (newUser) {
            const token = await createTokenAndSaveCookies(newUser._id, res);
            return res.status(201).json({ meassge: "User register successfuly", newUser, token: token });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }

}

export const login = async (req, res) => {
    const { email, password, role } = req.body
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user.password) {
            return res.status(400).json({ message: "User password is missing" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Inviled username and password" })
        }

        if (user.role !== role) {
            return res.status(400).json({ meassge: `Give role ${role} not found` })
        }

        let token = await createTokenAndSaveCookies(user._id, res);
        res.json({
            message: "User login successfuly", user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }, token: token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Interval server error" });

    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }
};


export const getMyProfile = async (req, res) => {
    const user = await req.user;
    res.status(200).json(user);
}

// All Admins show

export const AllAdmins = async (req, res) => {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
}