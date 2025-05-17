import express from 'express';
const router = express.Router();

import { registerValidation, loginValidation } from '../middlewares/authValidators.js';
import { register, login, logout } from '../controllers/authController.js';

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

export default router;