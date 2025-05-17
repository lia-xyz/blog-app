import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config({ path: '../config/config.env' })

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ error: 'Access denied.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
      }
}
