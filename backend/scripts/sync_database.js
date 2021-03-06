const { sequelize } = require('../models');

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("authentication succeeded!");
        await sequelize.sync({ force: true });
        console.log("synced!");
    } catch (err) {
        console.log("error: \n", err);
    }
}

syncDatabase();