import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
const sequlise = new Sequelize(process.env.URL,{ dialect: 'postgres' });
import User from "./user.js"; 
const { DataTypes } = Sequelize;
 
const theater = sequlise.define('theaters',{
    theater_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
});
User.hasMany(theater, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
theater.belongsTo(User);

await theater.sync();
export default theater;
 