import express from 'express';
const router = express.Router();

import { signupValidation, loginValidation } from '../middlewares/authValidators.js';
import { signin, login } from '../controllers/authController.js';

router.post('/signin', signupValidation, signin);
router.post('/login', loginValidation, login);

export default router;