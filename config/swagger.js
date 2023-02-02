import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hostedUrl = process.env.ROOT_URL || 'http://localhost:5000/';
const options = {
  definition: {
    openapi: '3.0.0',
        info: {
            title: 'Movie Ticket Booking System!',
            version: '1.0.0',
            description: 'These api calls are for ticket booking management system.',
        },
        servers: [
            {
                url: hostedUrl 
            }
        ],
		components: {
			securitySchemes: {
				userToken: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
  },
  apis: [path.join(__dirname, `../routes/`) + '*.js',], // files containing annotations as above
  };
const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;