import express from 'express';
import { AllAdmins, getMyProfile, login, logout, register } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/authUsers.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/my-profile', isAuthenticated, getMyProfile);
router.get('/admins', AllAdmins);


export default router;