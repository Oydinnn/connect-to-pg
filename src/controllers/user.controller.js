const GET = async (req, res) {
  try {
    const users = await pool.query("select * from users")
    res.status(200).json({
      status: 200,
      data: users.rows
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
  
}