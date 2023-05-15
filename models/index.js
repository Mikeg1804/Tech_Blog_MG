const Blog = require('./blogs');
const Author = require('./authors');

Author.hasMany(Blog, {
    primaryKey: 'authorId',
    onDelete: 'CASCADE',
});

Blog.belongsTo(Author, {
    foreignKey: 'authorId',
});

module.exports = { Author, Blog };