import { findUsers } from '../services/userService.js'

export const getUsers = async (req, res) => {
  try {
      const users = await findUsers()
      res.status(200).json({users})

  } catch (error) {
      res.status(500).send({
        message: "Server error", 
        error: error.message
      })
  }
}

export const postUser = async (req, res) => {
  res.send({status: "success", message: "User Created"})
}