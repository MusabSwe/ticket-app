import eventsController from "../controller/events.controller";
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/events", eventsController.getAllEvents);
    fastify.get("/reserved-events", eventsController.getReservedEvents);
    fastify.get("/available-tickets", eventsController.getAvailableTickets);
    fastify.post("/book-event", eventsController.bookEvent);
    fastify.delete("/cancel-reservation", eventsController.removeEvent);
}

export default {
    routes
}