import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { decode, jwt, sign, verify } from 'hono/jwt';
import { userRouter } from './routes/user';  
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>() 

app.use('/*',cors());

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);



// middleware

// routers






export default app

