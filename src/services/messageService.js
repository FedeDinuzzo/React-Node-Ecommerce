import messageModel from '../models/MongoDB/messageModel.js';

export const findMessages = async () => {
    try {
        const messages = await messageModel.find()
        return messages
    } catch (error) {
        throw new Error(error)
    }
}

export const updateMessage = async (message) => {
    try {        
        return await messageModel.insertMany(message);
    } catch (error) {
        throw new Error(error);
    }
}