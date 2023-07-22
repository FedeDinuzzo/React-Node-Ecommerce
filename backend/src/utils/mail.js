import nodemailer from 'nodemailer' 
import { env } from "../config/config.js"

export const transporter = nodemailer.createTransport({ // Generating the way to send info
  host: 'smtp.gmail.com', // Defines the email service (gmail)
  port: 465,
  auth:{
    user:'federico.dinuzzo.soluciones@gmail.com',
    pass: env.mailPass,
    authMethod: 'LOGIN'
  }
})