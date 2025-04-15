import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './user.js';

const Post = db.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'posts',
    underscored: true, 
    timestamps: true,
});

export default Post;