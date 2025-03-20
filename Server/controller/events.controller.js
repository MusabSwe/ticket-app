"use strict";
// import Events from '../models/events.model';
Object.defineProperty(exports, "__esModule", { value: true });
async function getAllEvents(request, reply) {
    try {
        reply.send("Not implemented all events yet");
    }
    catch (error) {
        reply.status(500).send(error);
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
        reply.send("Not implemented Available Tickets yet");
    }
    catch (error) {
        reply.status(500).send(error);
    }
}
async function bookEvent(request, reply) {
    try {
        reply.send("Not implemented bookEvent yet");
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
