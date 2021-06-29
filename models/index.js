const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//User has many Blog
User.hasMany(Blog, {
    foreignKey: 'user_id',
});

//Blog belongs to Use
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});
//User has many Comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
//Blog has many Comment
Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
});
//comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
//comment belongs to blog
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };