import User from './user.js';
import Post from './post.js';

Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

export { User, Post };