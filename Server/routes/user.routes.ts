// map the routes with the controller
import userController from "../controller/user.controller";
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/", userController.getAllUsers);
    fastify.get("/:id", userController.getUserById);
    fastify.post("/", userController.createUser);
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);
}

export default {
    routes
}