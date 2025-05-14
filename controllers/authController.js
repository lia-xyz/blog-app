import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';

export const register = async (req, res, next) => {
    const { username, password, email } = req.user;

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
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.user;

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
            status: 'Success',
            message: 'Logged in',
            data: { id: user.id, username: user.username },
            token
        });
    } catch (err) {
        res.status(500).send({ error: 'Server error during processing your request.' });
    }
}