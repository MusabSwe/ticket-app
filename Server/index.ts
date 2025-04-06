import Fastify from "fastify";
import dotenv from 'dotenv';
import MYSQL from '@fastify/mysql';
import eventRoutes from './routes/events.routes';

// sharable code
// to enable reading from .env file
dotenv.config();
const fastify = Fastify({ logger: true });

// Connect to my database
async function connectToDB() {
    await fastify.register(MYSQL, {
        promise: true,
        connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB}`,
    });
    console.log('Successfully connected to the databases');
}

// Handle cors issue
fastify.addHook('onRequest', async (req, reply) => {
    reply.header('access-control-allow-origin', 'http://localhost:5173');
    reply.header('access-control-allow-methods', 'GET,POST,PUT,DELETE,OPTIONS');
    reply.header('access-control-allow-headers', 'Content-Type, Authorization');

    // Handle preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
        reply.status(204).send();
    }

});

// Import my routes
fastify.register(eventRoutes.routes);

// start my server
const start = async () => {
    try {
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

connectToDB();
start();