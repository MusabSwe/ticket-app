import Fastify from "fastify";
import userRoutes from "./routes/user.routes";
import dotenv from 'dotenv';
import MYSQL from '@fastify/mysql';

// sharable code
// to enable reading from .env file
dotenv.config();
const fastify = Fastify({ logger: true });

// Import my routes
const userRoute = userRoutes.routes;

// Connect to my database
async function connect() {
    await fastify.register(MYSQL, {
        connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB}`,
    });
    console.log('Event table', );
    console.log('Successfully connected to the databases');
}

// start my server
fastify.register(userRoute, { prefix: "/api/v1/users" });

const start = async () => {
    try {
        console.log('process.env.PORT: ', process.env.PORT);
        const port = Number(process.env.PORT) || 5000;
        await fastify.listen({ port });

        const address = fastify.server.address();
        if (address && typeof address !== "string") {
            fastify.log.info(`Server is running on port ${address.port}`)
        } else {
            fastify.log.info(`Server is running at ${address}`)
        }
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
connect();
start();