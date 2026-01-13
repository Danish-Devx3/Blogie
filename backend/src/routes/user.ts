import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@100xdevs/medium-common";
import { hash, compare } from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Input not valid"
    });
  }
 
  const userExists = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (userExists) {
    c.status(409); // Conflict
    return c.json({ error: "User already exists with this email" });
  }

  const hashedPassword = await hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      password: hashedPassword,
    }
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ jwt: token });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Input not valid" });
  }

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "Invalid credentials" });
  }

  const passwordValid = await compare(body.password, user.password);

  if (!passwordValid) {
    c.status(403);
    return c.json({ error: "Invalid credentials" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ jwt: token });
});