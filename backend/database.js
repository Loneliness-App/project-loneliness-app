const { Sequelize, DataTypes } = require('sequelize');

DB_NAME = process.env.DB_NAME;
DB_UNAME = process.env.DB_UNAME;

const sequelize = new Sequelize(DB_NAME, DB_UNAME, '', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});

//sequelize.authenticate().then(() => console.log("connected")).catch((err) => console.log("error: ", err));

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
}, {});

const Request = sequelize.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id",
        },
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING(KEY_LENGTH),
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id",
        },
        allowNull: false,
    },
    reqId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Request",
            key: "id",
        },
        allowNull: false,
    },
});

const Suggestion = sequelize.define('Suggestion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    replyId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Reply",
            key: "id",
        },
        allowNull: false,
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false,
    }
});

//sequelize.sync().then(() => console.log("synced")).catch((err) => console.log("error", err));

module.exports = {User, Request, Reply, Suggestion}




