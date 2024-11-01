import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { z } from "zod";

type Variables = {
    id: string;
};

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};

export const blogRouter = new Hono<{
    Bindings: Bindings;
    Variables: Variables;
}>();

const CreateUser = z.object({
    title: z.string(),
    content: z.string(),
});

const UpdateUser = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
});

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("authorization") ?? "";
    if (header.startsWith("Bearer")) {
        const token = header.split(" ")[1];
        try {
            const response = await verify(token, c.env.JWT_SECRET);
            const userId = response.id as string;
            if (userId) {
                c.set("id", userId);
                await next();
            }
        } catch (err) {
            c.status(403);
            return c.json({ error: "unauthorized user" });
        }
    } else {
        c.status(403);
        return c.json({ error: "Invalid token" });
    }
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany();
        c.status(200);
        return c.json({ blogs });
    } catch (err) {
        c.status(411);
        return c.json({ message: "Cannot fetch blogs, something went wrong" });
    }
});

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id,
            },
        });
        c.status(200);
        return c.json({ blog });
    } catch (err) {
        return c.json({ message: "Blog does not exist" });
    }
});

blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("id");
    const body = await c.req.json();
    const { success } = CreateUser.safeParse(body);
    if (success) {
        try {
            const blog = await prisma.post.create({
                data: {
                    title: body.title,
                    content: body.content,
                    authorId: userId,
                },
            });
            return c.json({ blog });
        } catch (err) {
            c.status(411);
            return c.json({ message: "Unable to post, please try again" });
        }
    } else {
        c.status(422);
        return c.json({ message: "Invalid Inputs" });
    }
});

blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = UpdateUser.safeParse(body);
    if (success) {
        const userId = c.get("id");
        try {
            await prisma.post.update({
                where: {
                    id: body.id,
                    authorId: userId,
                },
                data: {
                    title: body.title,
                    content: body.content,
                },
            });
            return c.json({ message: "Updated" });
        } catch (err) {
            c.status(411);
            return c.json({ message: "Unable to post, please try again" });
        }
    } else {
        c.status(422);
        return c.json({ message: "Invalid Inputs" });
    }
});
