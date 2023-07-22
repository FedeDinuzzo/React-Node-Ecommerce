import { findUserByEmail, updatePassword } from '../services/userService.js'  // export instance of the user.controller class
import { validatePassword, createHash } from "../utils/bcrypt.js"
import { generateToken, generateTokenRestorePass } from '../utils/jwt.js'
import { env } from "../config/config.js"
import { transporter } from "../utils/mail.js"

export const getSession = (req, res) => {
  try {
    if (req.session.login) {
      const sessionData = {}

      if (req.session.userFirst) {
        sessionData.name = req.session.userFirst
        sessionData.rol = req.session.rol
        sessionData.idCart = req.session.idCart
      } else {
        sessionData.name = req.session.user.first_name
        sessionData.rol = req.session.user.rol
        sessionData.idCart = req.session.idCart
      }
      return sessionData
    } else {
      res.redirect('/login', 500, { message: "Login to continue" })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// Admin
// email: admin@coder.com
// password: coderhouse
export const testLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)

    if (user && validatePassword(password, user.password)) {
      req.session.login = true
      req.session.userFirst = user.first_name
      req.session.rol = user.rol
      req.session.idCart = user.idCart
      console.log(`${email} is ${user.rol}`)
      console.table(req.session)
      const token = generateToken(user)
      
      return res
        .cookie('jwtCookies',token,{maxAge: 30000 , httpOnly: true} ) // setea la cookie
        .status(200)
        .json({token})//muestra el token

    } else {
      res.status(401).json({
        message: "User or password incorrect"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const recoverPasswordEmail = async (req, res) => {
  const { email } = req.params
  try {
    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Email not found in database'
      })  
    }

    const resetLink = "http://localhost:5173/recoverChangePassword"

    const mailToSend = {
      from: 'no-reply',
      to: email,
      subject: 'Password reset link',
      html: `
      <p>Hi ${user.first_name},</p>
      <a href="${resetLink}">Click here to reset your password</a>

      <p>If you did not request a password change, please ignore this email</p>`
    }
    transporter.sendMail(mailToSend)

    req.logger.info(`Password reset link sent to ${email}`)
    const token = generateTokenRestorePass(email)

    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    return res
      .status(200)
      .cookie('jwtCookiesRestorePass',token,{maxAge: oneHour  , httpOnly: true} )
      .clearCookie('booleanTimeOut')
      .json({
          status: 'success',
          message: `Password reset link sent to ${email}`,
          Link: resetLink,
          token: token

        })

  } catch (error) {
    req.logger.error(`Error in password reset procedure - ${error.message}`)
    res.status(500).send({
      status: 'error',
      message: error.message
    })
    next(error)
}}

export const changePass = async (req, res, next) => {
  const { email, password } = req.body
  const user = await findUserByEmail(email)

  if (!validatePassword(password, user.password)) {  
    const passwordHash = createHash(password) 
    await updatePassword(user.id,passwordHash) 
  } else {
    return res.status(500).send("Use same password")
  }

  return res.status(200)
  .clearCookie('jwtCookiesRestorePass')
  .send("Password changed")
}

export const destroySession = (req, res) => {
  try {
    if (req.session.login) {
      req.session.destroy()
      console.log(`Session closed`)
    }

    res.status(200).redirect('/')
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const requireAuth = (req, res, next) => {
  req.session.login ? next() : res.redirect('/login')
}