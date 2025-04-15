import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' })

import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
})

export default db;