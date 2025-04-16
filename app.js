import express from 'express';
const app = express();

import db from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import postsRoutes from './routes/postsRoutes.js';

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to the database:', err));

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});