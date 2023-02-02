import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize } from 'sequelize';
import swaggerSpec from './config/swagger.js';
import swaggerUi from "swagger-ui-express";
import routes from "./routes/index.js";
import reset from './config/reset.js';
const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(express.json());

try {
    await new Sequelize(process.env.URL).authenticate();
  console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.get("/", (req, res) => {
  res.send("Movie Ticket Booking API!");
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);
//app.get('/reset', reset);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

