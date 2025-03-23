"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getAllEvents(request, reply) {
    try {
        const app = request.server.mysql;
        // Ensure MySQL2 returns a promise-based response
        const [rows] = await app.query('SELECT * FROM sa_events');
        return reply.send(rows); // Return to prevent multiple replies
    }
    catch (error) {
        return reply.status(500).send(error);
    }
}
async function getReservedEvents(request, reply) {
    try {
        reply.send("Not implemented Reserved Events yet");
    }
    catch (error) {
        reply.status(500).send(error);
    }
}
async function getAvailableTickets(request, reply) {
    try {
        const app = request.server.mysql;
        const { eventId, eventDate } = request.query;
        const [rows] = await app.query(eventDate ? `
            select *
            from tickets
            where event_id = ? AND event_date = ?
        `
            :
                `
            select *
            from tickets
            where event_id = ?
        `, [eventId, eventDate]);
        return reply.send(rows);
    }
    catch (error) {
        return reply.status(500).send(error);
    }
}
async function bookEvent(request, reply) {
    try {
        const app = request.server.mysql;
        const body = {};
    }
    catch (error) {
        reply.status(500).send(error);
    }
}
async function removeEvent(request, reply) {
    try {
        reply.send("Not implemented removeEvent yet");
    }
    catch (error) {
        reply.status(500).send(error);
    }
}
exports.default = {
    getAllEvents,
    getReservedEvents,
    getAvailableTickets,
    bookEvent,
    removeEvent
};
