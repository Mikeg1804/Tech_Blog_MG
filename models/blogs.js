const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {

}

Blog.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: { type: DataTypes.STRING, 
        allowNull: false
     },
    content: { type: DataTypes.STRING, 
        allowNull: false 
    },
    author_id: { type: DataTypes.INTEGER,
        references: {
            model: 'authors',
            key: 'id'
        },
        allowNull: false,
    },
}, 
{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogs'
}
);

module.exports = Blog;