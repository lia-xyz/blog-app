import express from 'express';
const router = express.Router();

import { registerValidation, loginValidation } from '../middlewares/authValidators.js';
import { register, login } from '../controllers/authController.js';

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;