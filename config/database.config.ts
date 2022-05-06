import { Sequelize } from 'sequelize';

const db = new Sequelize('inflack', 'fuad', 'fuad', {
	host: 'localhost',
    dialect: 'postgres' 
});

export default db;