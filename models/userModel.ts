import { DataTypes , Model } from "sequelize";
import { Sequelize } from "sequelize";
import db from "../config/database.config"

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: db,
        tableName: 'Users'
    }
);