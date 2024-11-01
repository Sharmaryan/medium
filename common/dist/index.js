"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInput = exports.updateUserInput = exports.createUserInput = void 0;
const zod_1 = require("zod");
exports.createUserInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateUserInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string(),
});
exports.authInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
