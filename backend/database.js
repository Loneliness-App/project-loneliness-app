const sequelize = new Sequelize('', {
    define: {
        freezeTableName: true
    }
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

const Suggestion = sequelize.define('Reply', {
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
        type: DataTypes.STRING(500)
    }
});

