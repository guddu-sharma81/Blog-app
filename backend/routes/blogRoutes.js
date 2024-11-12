import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlogs, updateBlogs } from '../controller/blogController.js'
import { isAdmin, isAuthenticated } from '../middleware/authUsers.js'
const router = express.Router();

router.post('/create', isAuthenticated, isAdmin("admin"), createBlog);
router.delete('/delete/:id', isAuthenticated, isAdmin("admin"), deleteBlog);
router.get('/all-blogs', getAllBlogs);
router.get('/one-blog/:id', isAuthenticated, getSingleBlogs);
router.get('/my-blogs', isAuthenticated, isAdmin("admin"), getMyBlogs);
router.put('/update/:id', isAuthenticated, isAdmin("admin"), updateBlogs);


export default router;