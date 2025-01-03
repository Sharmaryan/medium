import { z } from "zod";

export const createUserInput = z.object({
    title: z.string(),
    content: z.string(),
});

export const updateUserInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
});

export const authInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type SignupInput = z.input<typeof authInput>
export type SigninInput = SignupInput
export type CreatePostInput = z.input<typeof createUserInput>
export type updatePostInput = z.input<typeof updateUserInput>