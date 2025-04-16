import validator from 'validator';
import express from 'express';
const router = express.Router();

import { Post } from '../models/index.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import { postsValidation } from '../middlewares/postsValidators.js';
import { getPosts, getMyPosts, getMyPostById, getPostById, addPost, updatePost, deletePost } from '../controllers/postsController.js';


router.param('id', async (req, res, next, id) => {
    if (!validator.isNumeric(id, { no_symbols: true }) || parseInt(id) <= 0) {
        return res.status(400).send({ error: 'Invalid post ID' });
    }

    const post = await Post.findByPk(id);
    if(!post) {
        return res.status(404).send({ error: 'Post not found' });
    }

    req.post = post;
    next();
});

router.get('/', getPosts);
router.get('/my-posts', authMiddleware, getMyPosts);
router.get('/my-posts/:id', authMiddleware, getMyPostById);
router.get('/:id', getPostById);
router.post('/', authMiddleware, postsValidation, addPost);
router.put('/:id', authMiddleware, postsValidation, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;