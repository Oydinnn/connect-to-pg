import pool from '../db/config.js'

// GET ALL AND GET BY QUERY
const GET = async (req, res) => {
  try {
    const { title, description, user_id} = req.query;

    let query = 'SELECT id, title, description, user_id FROM posts WHERE 1=1 ';
    const values = [];

    if(title){
      values.push(`%${title}%`);
      query += ` AND title ILIKE $${values.length}`
    }
     if(description){
      values.push(`%${description}%`);
      query += ` AND description ILIKE $${values.length}`
    }
     if(user_id){
      values.push(user_id);
      query += ` AND user_id = $${values.length}`
    }

    const posts = await pool.query(query, values)
    
    res.status(200).json({
      status: 200,
      message: posts.rows
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
}

// GET BY ID
 const GET_BY_ID = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query(`SELECT * FROM posts WHERE id = ${id}`);

    res.status(200).json({
      status: 200,
      data: post.rows
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
 }

//  POST
const POST = async (req, res)=>{
  try {
    const { title, description, user_id } = req.body 
    if(!title){
      return res.status(400).json({
        status: 400,
        message: 'title majburiy'
      })
    }
     if(!description){
      return res.status(400).json({
        status: 400,
        message: 'description majburiy'
      })
    }
     if(!user_id){
      return res.status(400).json({
        status: 400,
        message: 'user_id majburiy'
      })
    }

    await pool.query("INSERT INTO POSTS (title, description, user_id) values ($1, $2, $3)",
      [title, description, user_id])

      res.status(201).json({
        status: 201,
        data: 'post created'
      })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
}

// UPDATE
const PUT = async (req, res) => {
  try {
    const { id } = req.params
    const {title, description, user_id} = req.body
  let post = await pool.query(`SELECT * FROM posts WHERE id = ${id}`)

  if(!title && !description && !user_id){
    return res.status(400).json({
      status: 400,
      message: 'update qilish uchun hech bulmaganda bitta field qushilishi kerak'
    })
  }
  
      let query = 'UPDATE posts SET'
      let values = []
      let count = 1
  
      if(title){
        query += ` title = $${count},`
        values.push(title)
        count++
      }
      if(description){
        query += ` description = $${count},`;
        values.push(description)
        count++;
      }
      if(user_id){
        query += ` user_id = $${count},`;
        values.push(user_id)
        count++;
      }
      query = query.slice(0, -1)
      query += ` WHERE id = $${count}`
      values.push(+id)
      const result = await pool.query(query, values)

      if(result.rowCount === 0){
        return res.status(404).json({
          status: 404,
          message: 'post not founded'
        })
      }
      return res.status(201).json({
        status: 201,
        message: 'post updated'
      })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
}
const DELETE = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`DELETE FROM posts WHERE id = $1`, [id])

    if (result.rowCount === 0) {
    return res.status(404).json({
      status: 404,
      message: 'post not found'
    });
    }

    res.status(200).json({
      status: 200,
      message: 'post deleted'
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}
export default {
  GET,
  GET_BY_ID,
  POST,
  PUT,
  DELETE
}