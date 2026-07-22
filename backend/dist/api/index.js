"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
exports.default = server_1.default;
//health check endpoint added to backend/api/index.ts to verify server status and respond with a 200 OK status and JSON message.
