import { Post } from '../models/index.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { isPrivate: false },
            order: [['createdAt', 'DESC']],
        });

        res.status(200).send({
            status: 'Success',
            message: 'Retrieved public posts.',
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
            order: [['createdAt', 'DESC']],
        });

        res.status(200).send({
            status: 'Success',
            message: 'Retrieved user posts.',
            data: posts,
        });
    }catch (err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const getMyPostById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid post ID.' });
    }

    try{
        const post = await Post.findByPk(id);

        if(!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        if (post.userId !== req.user.id) {
            return res.status(403).send({ error: 'Not authorized to view this post.' });
        }     

        res.status(200).send({
            status: 'Success',
            message: 'Retrieved post by id.',
            data: post,
        });

    } catch(err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid post ID.' });
    }

    try{
        const post = await Post.findByPk(id);

        if(!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        if (post.isPrivate) {
            return res.status(403).send({ error: 'Not authorized to view this post.' });
        }     

        res.status(200).send({
            status: 'Success',
            message: 'Retrieved post by id.',
            data: post,
        });

    } catch(err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const addPost = async (req, res) => {
    const { title, content, isPrivate } = req.body;

    if(!title || !content) {
       return res.status(400).send({ error: 'Title and content are required to create a post.' })
    }

    const userId = req.user.id;

    try {
        const newPost = await Post.create({
            title,
            content,
            isPrivate,
            userId: userId,
        });

        res.status(201).send({
            status: 'Success',
            message: 'New post created.',
            data: newPost,
        });
    } catch (err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }

};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, isPrivate } = req.body;

    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid ID.' });
    }

    try{
        const post = await Post.findByPk(id);

        if(!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        if (post.userId !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed to edit this post.' });
        }

        if (title !== undefined) post.title = title;
        if (content !== undefined) post.content = content;
        if (isPrivate !== undefined) post.isPrivate = isPrivate;
      
        await post.save();

        res.status(200).send({
            status: 'Success',
            message: 'Post updated.',
            data: post,
        });
    } catch(err) {
        console.error(err);
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid ID.' });
    }

    try{
        const post = await Post.findByPk(id);

        if(!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        if (post.userId !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed to delete this post.' });
        }

        await post.destroy();

        res.status(204).send();

    } catch(err) {
        console.error(err);
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
};