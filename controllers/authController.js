import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';

export const signin = async (req, res, next) => {
    const { username, password, email } = req.body;

    if(!username || !password || !email) {
        return res.status(400).send({ error: 'Please fill in all fields to register.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
        })

        res.status(201).send({
            status: 'Success',
            message: 'New user created',
            data: { id: newUser.id, username: newUser.username },
        });
    } catch (err) {
        res.status(500).send({ error: 'Server error during registration.' });
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).send({ error: 'Please fill in all fields to log in.' });
    }

    try {
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({
            status: 'Successful',
            message: 'Login',
            data: { id: user.id, username: user.username },
            token
        });
    } catch (err) {
        res.status(500).send({ error: 'Server error during login.' });
    }
}