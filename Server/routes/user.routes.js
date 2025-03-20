"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// map the routes with the controller
const user_controller_1 = __importDefault(require("../controller/user.controller"));
async function routes(fastify, options) {
    fastify.get("/", user_controller_1.default.getAllUsers);
    fastify.get("/:id", user_controller_1.default.getUserById);
    fastify.post("/", user_controller_1.default.createUser);
    fastify.put("/:id", user_controller_1.default.updateUser);
    fastify.delete("/:id", user_controller_1.default.deleteUser);
}
exports.default = {
    routes
};
