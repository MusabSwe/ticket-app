// connect controller with DB layer
// import User from "../models/user.model";
import { FastifyRequest, FastifyReply } from 'fastify';

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        reply.send("Not implemented yet");
    } catch (error) {
        reply.status(500).send(error);
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}