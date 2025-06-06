import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>();


blogRouter.use('/*', async (c, next)=>{
    const header = c.req.header("Authorization") || "";

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const user = await verify(header,c.env.JWT_SECRET);
    console.log(user.id)

    const userExits = await prisma.user.findUnique({
        where: { id: user.id as string },
      });
      if (!userExits) {
        throw new Error("User does not exist");
    }

    if(user){
        c.set("userId", user.id as string);
        await next();
    } else{
        c.status(403)
        return c.json({
            message:"you are not aLogged in"
        });
    }
});


blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({message:"Input not valid"})
      }
    const userId = c.get("userId");

    const blog = await prisma.blog.create({
        data:{
            title:body.title,
            content: body.content,
            authorId:userId
        }
    })


    return c.json({id:blog.id})
});


blogRouter.put('/', async (c)=>{
    const body = await c.req.json()
    const { success } = updateBlogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({message:"Input not valid"})
      }

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id:body.id
        },

        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({blogs})
})

blogRouter.get('/:id', async (c)=>{
    const id = c.req.param("id")

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id:Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                },
            }
        })

        return c.json({blog});
    } catch(e){
        c.status(411)
        c.json({
            message: "Error while fetching blog post"
        });
    }

});

