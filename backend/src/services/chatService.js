import chatModel from '../models/MongoDB/chatModel.js'

export const findMessages = async () => {
  try {
    const messages = await chatModel.find()
    return messages
  } catch (error) {
    throw new Error(error)
  }
}

export const updateMessage = async (message) => {
  try {        
    return await chatModel.insertMany(message)
  } catch (error) {
    throw new Error(error)
  }
}