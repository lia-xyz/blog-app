import { Post } from '../models/index.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { isPrivate: false },
            order: [['updatedAt', 'DESC']],
        });

        res.status(200).send({
            message: 'Retrieved all public posts',
            data: posts,
        });
    }catch (err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { userId: req.user.id },
            order: [['updatedAt', 'DESC']],
        });

        res.status(200).send({
            message: 'Retrieved all posts by the authenticated user',
            data: posts,
        });
    }catch (err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const getMyPostById = async (req, res) => {
    try{
        if (req.post.userId !== req.user.id) {
            return res.status(403).send({ error: 'Not authorized to view this post' });
        }     

        res.status(200).send({
            message: 'Retrieved a specific post by the authenticated user',
            data: req.post,
        });

    } catch(err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const getPostById = async (req, res) => {
    try{
        if (req.post.isPrivate) {
            return res.status(403).send({ error: 'Not authorized to view this post' });
        }     

        res.status(200).send({
            message: 'Retrieved a specific post',
            data: req.post,
        });

    } catch(err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const addPost = async (req, res) => {
    const { title, content, isPrivate } = req.postData;

    try {
        const newPost = await Post.create({
            title,
            content,
            isPrivate,
            userId: req.user.id,
        });

        res.status(201).send({
            message: 'Post created',
            data: newPost,
        });
    } catch (err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }

};

export const updatePost = async (req, res) => {
    const { title, content, isPrivate } = req.postData;
    const post = req.post;

    try{
        if (post.userId !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed to edit this post' });
        }

        post.title = title;
        post.content = content;
        post.isPrivate = isPrivate;
      
        await post.save();

        res.status(200).send({
            message: 'Post updated',
            data: post,
        });
    } catch(err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const deletePost = async (req, res) => {
    try{
        if (req.post.userId !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed to delete this post' });
        }

        await req.post.destroy();

        res.status(200).send({
            message: 'Post deleted',
        });
    } catch(err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};