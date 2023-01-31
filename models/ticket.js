import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
const sequlise = new Sequelize(process.env.URL,{ dialect: 'postgres' });
import User from "./user.js";
import Show from "./show.js"; 
const { DataTypes } = Sequelize;
 
const ticket = sequlise.define('tickets',{
    booked_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
});
User.hasMany(ticket, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  ticket.belongsTo(User);
Show.hasMany(ticket, {
    foreignKey: {
        name: 'show_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

await ticket.sync();
export default ticket;
 