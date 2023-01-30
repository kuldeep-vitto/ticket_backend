import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
  definition: {
    openapi: '3.0.0',
        info: {
            title: 'Movie Ticket Booking System!',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:5000/' 
            }
        ]
  },
  apis: [path.join(__dirname, `../routes/`) + '*.js',], // files containing annotations as above
  };
const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;