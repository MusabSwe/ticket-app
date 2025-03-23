import { FastifyRequest, FastifyReply } from 'fastify';

type TicketParams = {
    eventId: number;
    eventDate: string;
};


async function getAllEvents(request: FastifyRequest, reply: FastifyReply) {
    try {
        const app = request.server.mysql;
        // Ensure MySQL2 returns a promise-based response
        const [rows]: any = await app.query('SELECT * FROM sa_events');

        return reply.send(rows); // Return to prevent multiple replies
    } catch (error) {
        return reply.status(500).send(error);
    }
}

async function getReservedEvents(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented Reserved Events yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function getAvailableTickets(request: FastifyRequest<{ Querystring: TicketParams }>, reply: FastifyReply) {
    try {
        const app = request.server.mysql;

        const { eventId, eventDate } = request.query;
        const [rows]: any = await app.query
            (eventDate ? `
            select *
            from tickets
            where event_id = ? AND event_date = ?
        `
                :
                `
            select *
            from tickets
            where event_id = ?
        `
                , [eventId, eventDate]);
        return reply.send(rows);
    } catch (error) {
        return reply.status(500).send(error);
    }
}

async function bookEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
        const app = request.server.mysql;
        const body = {
            
        }
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
