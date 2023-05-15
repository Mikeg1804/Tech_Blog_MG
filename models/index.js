const Blog = require('./blogs');
const Author = require('./authors');

Author.hasMany(Blog, {
    foregingKey: 'author_id',
    onDelete: 'CASCADE',
});

Blog.belongsTo(Author, {
    foreignKey: 'author_id',
});

module.exports = { Author, Blog };