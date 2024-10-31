import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("authorization") ?? "";
    const response = await verify(header, c.env.JWT_SECRET);
    if (response.id) {
        await next();
    } else {
        c.status(403);
        return c.json({ error: "unauthorized" });
    }
});

blogRouter.get("/bulk", (c) => {
    const id = c.req.param("id");
    console.log(id);
    return c.text("get blog route");
});


blogRouter.get("/:id", (c) => {
    const id = c.req.param("id");
    console.log(id);
    return c.text("get blog route");
});

blogRouter.post("/", (c) => {
    return c.text("signin route");
});

blogRouter.put("/", (c) => {
    return c.text("signin route");
});
