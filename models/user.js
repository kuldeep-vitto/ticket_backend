import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
const sequlise = new Sequelize(process.env.URL,{ dialect: 'postgres' });
const { DataTypes } = Sequelize;
 
const user = sequlise.define('users',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
});
await user.sync(); 
export default user;
 