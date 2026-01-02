import express from 'express'
// import pool from './db/config.js'
import { config } from "dotenv";
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js'

config()
 const app = express()
 app.use(express.json())

 app.use(userRouter)
 app.use(postRouter)

 app.listen(process.env.PORT, ()=> console.log('SERVER IS RUNNING ON PORT:', process.env.PORT))