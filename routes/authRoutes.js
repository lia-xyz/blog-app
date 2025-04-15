import express from 'express';
const router = express.Router();

import { signin, login } from '../controllers/authController.js';
import { signupValidation, loginValidation, handleValidation } from '../middlewares/validators.js';

router.post('/signin', signupValidation, handleValidation, signin);
router.post('/login', loginValidation, handleValidation, login);

export default router;