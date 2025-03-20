import fastify,{ FastifyRequest, FastifyReply } from 'fastify';

async function getAllEvents(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented all events yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function getReservedEvents(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented Reserved Events yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}


async function getAvailableTickets(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented Available Tickets yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function bookEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented bookEvent yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function removeEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented removeEvent yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

export default {
    getAllEvents,
    getReservedEvents,
    getAvailableTickets,
    bookEvent,
    removeEvent
}