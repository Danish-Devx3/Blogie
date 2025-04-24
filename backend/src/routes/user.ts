import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import z from 'zod';
import { signinInput, signupInput } from "@100xdevs/medium-common";


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
  if(!success){
    c.status(411);
    return c.json({
      message:"Input not valid"
    })
  }
 
  const userExits = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (userExits) {
    c.status(411)
    return c.json({ error: "user exits use anothor email" });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      password: body.password,
    }
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json(token);
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({message:"Input not valid"})
  }


  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
      password: body.password,
    },
  });

  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const token = await sign({ id: user.id }, "mysecret");

  return c.json(token);
});
