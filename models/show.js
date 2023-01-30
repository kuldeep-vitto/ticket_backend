import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";
const sequlise = new Sequelize(process.env.URL,{ dialect: 'postgres' });
import Theater from "./theater.js"; 
const { DataTypes } = Sequelize;
 
const show = sequlise.define('shows',{
    movie_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    seats_available: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
});
Theater.hasMany(show, {
    foreignKey: {
        name: 'theater_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
show.belongsTo(Theater);
await show.sync();

console.log("The table for the shows model was just (re)created!");
export default show;
 