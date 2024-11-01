import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";
export const userRouter = new Hono();
const Auth = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = Auth.safeParse(body);
    if (success) {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            },
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token });
    }
    else {
        c.status(422);
        return c.json({ message: "Invalid Inputs" });
    }
});
userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = Auth.safeParse(body);
    if (success) {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
        });
        if (!user) {
            c.status(404);
            return c.json({ msg: "User not found" });
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt: token });
    }
    else {
        c.status(422);
        return c.json({ message: "Invalid Inputs" });
    }
});
