const { Sequelize, DataTypes } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = require('./config');

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: 'postgres',
// });
const sequelize = new Sequelize('lonliness', 'clark2', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
    }
});

const Request = sequelize.define('Request', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
    },
});

const Reply = sequelize.define('Reply', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
});

const Suggestion = sequelize.define('Suggestion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING(10),
    },
    message: {
        type: DataTypes.STRING,
    }
});

User.hasMany(Request);
Request.belongsTo(User);

User.hasMany(Reply);
Reply.belongsTo(User);

Request.hasMany(Reply);
Reply.belongsTo(Request);

Reply.hasMany(Suggestion);
Suggestion.belongsTo(Reply);

module.exports = { sequelize, Sequelize, User, Request, Reply, Suggestion }