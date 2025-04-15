import express from 'express';
const router = express.Router();

import { getPosts, getMyPosts, getMyPostById, getPostById, addPost, updatePost, deletePost } from '../controllers/postsController.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import { postValidation, handleValidation } from '../middlewares/validators.js';

router.get('/', getPosts);
router.get('/my-posts', authMiddleware, getMyPosts);
router.get('/my-posts/:id', authMiddleware, getMyPostById);
router.get('/:id', getPostById);
router.post('/', authMiddleware, postValidation, handleValidation, addPost);
router.put('/:id', authMiddleware, postValidation, handleValidation, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;