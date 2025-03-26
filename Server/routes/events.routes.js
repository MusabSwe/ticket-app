"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_controller_1 = __importDefault(require("../controller/events.controller"));
async function routes(fastify, options) {
    fastify.get("/events", events_controller_1.default.getAllEvents);
    fastify.get("/reserved-events", events_controller_1.default.getReservedEvents);
    fastify.get("/available-tickets", events_controller_1.default.getAvailableTickets);
    fastify.post("/book-event", events_controller_1.default.bookEvent);
    fastify.delete("/cancel-reservation", events_controller_1.default.removeEvent);
}
exports.default = {
    routes
};
