import express from 'express'
import pool from './db/config.js'
import { config } from "dotenv";
import userRouter from './routes/user.route.js';

config()
 const app = express()
 app.use(express.json())

 app.get("/users", async (req, res) => {
  
})

app.post('/users', async (req, res) => {
  try {
    const { name, age} = req.body;
    await pool.query("insert into users(name, age) values($1, $2)", [name, age])

    res.status(201).json({
    status: 201,
    message: 'user created'
  })
  } catch (error) {
      res.status(500).json({
      status: 500,
      message: error.message
    })
  }
  
})



 app.listen(process.env.PORT, ()=> console.log('SERVER IS RUNNING ON PORT:', process.env.PORT))