const { Sequelize, DataTypes } = require('sequelize');

// DB_NAME = process.env.DB_NAME;
// DB_UNAME = process.env.DB_UNAME;
DB_NAME = "lonliness";
DB_UNAME = "clark2"

const sequelize = new Sequelize(DB_NAME, DB_UNAME, 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const KEY_LENGTH = 16;

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING(KEY_LENGTH),
        allowNull: false,
    }
});

const Request = sequelize.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    key: {
        type: DataTypes.STRING(KEY_LENGTH),
        allowNull: false,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
});

const Suggestion = sequelize.define('Suggestion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false,
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

sequelize.sync()

module.exports = { sequelize, Sequelize, User, Request, Reply, Suggestion }




