import { body, validationResult } from 'express-validator';

export const signupValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email')
    .isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const loginValidation = [
  body('username')
    .notEmpty().withMessage('Username is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

export const postValidation = [
  body('title')
    .notEmpty().withMessage('Title is required'),
  body('content')
    .notEmpty().withMessage('Content is required'),
  body('isPrivate')
    .optional()
    .isBoolean().withMessage('isPrivate must be a boolean'),
];

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  };