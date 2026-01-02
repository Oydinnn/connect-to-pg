import pool from '../db/config.js'

// GET ALL STUDENTS & GET BY QUERY
const GET = async (req, res) => {
  try {
    const { name, age, phone, email } = req.query;

    let query = "SELECT id, name, age, phone, email FROM users WHERE 1=1";
    const values = [];

    if (name) {
      values.push(`%${name}%`);
      query += ` AND name ILIKE $${values.length}`;
    }

    if (age) {
      values.push(age);
      query += ` AND age = $${values.length}`;
    }

    if (phone) {
      values.push(phone);
      query += ` AND phone = $${values.length}`;
    }

    if (email) {
      values.push(email);
      query += ` AND email ILIKE $${values.length}`;
    }

    const users = await pool.query(query, values);
    
    res.status(200).json({
      status: 200,
      data: users.rows
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};
// GET BY ID
const GET_BY_ID = async (req, res) => {
  try {
    const { id } = req.params
    let user = await pool.query(`SELECT * FROM users WHERE id = ${id}`)

    res.status(200).json({
      status: 200,
      message: user.rows
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}
// POST USER
const POST = async(req, res)=>{
  try {
    const { name, age, phone, email, password} = req.body;

    if(!name){
      return res.status(400).json({
        status: 400,
        message: 'name majburiy'
      })
    }
    if(!age){
      return res.status(400).json({
        status: 400,
        message: 'age majburiy'
      })
    }
    if(!phone){
      return res.status(400).json({
        status: 400,
        message: 'phone majburiy'
      })
    }
    if(!email){
      return res.status(400).json({
        status: 400,
        message: 'email majburiy'
      })
    }
    if(!password){
      return res.status(400).json({
        status: 400,
        message: 'password majburiy'
      })
    }

    await pool.query("insert into users( name, age, phone, email, password) values($1, $2, $3, $4, $5)", 
    [ name, age, phone, email, password])

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
}
// UPDATE USER
const PUT = async(req, res)=>{
  try {
    const {id} = req.params
    const{name, age, phone, email} = req.body

    if(!name && !age && !phone && !email){
      return res.status(400).json({
        status: 400,
        message: 'update qilish uchun hech bulmaganda bitta field qushilishi kerak'
      })
    }

    let query = 'UPDATE users SET'
    let values = []
    let count = 1

    if(name){
      query += ` name =$${count},`
      values.push(name)
      count++
    }
    if(age){
      query += ` age = $${count},`
      values.push(age)
      count++
    }
    if(email){
      query += ` email =$${count},`
      values.push(email)
      count++
    }
    if(phone){
      query += ` phone = $${count},`
      values.push(phone)
      count++
    }
    query = query.slice(0, -1)
    query += ` WHERE id = $${count} RETURNING id, name, age, phone, email`
    values.push(+id)
    const result = await pool.query(query, values)

    if(result.rowCount === 0){
      return res.status(404).json({
        status: 404,
        message: 'user not founded'
      })
    }
    return res.status(200).json({
      status: 200,
      data: result.rows[0]
    })
    
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}

const DELETE = async(req, res) =>{
  try {
    const { id } = req.params
    const user = await pool.query(`DELETE FROM users WHERE id = ${id}`)

    return res.status(201).json({
      status: 201,
      message: (await (pool.query("select * from users"))).rows
    })
    
  } catch (error) {
    return res.status(404).json({
      status: 400,
      message:  error.message
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