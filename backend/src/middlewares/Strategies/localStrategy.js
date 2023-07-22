import local from 'passport-local'
import { findUserByEmail, createUser } from '../../services/userService.js'
import { createCart } from '../../services/cartService.js'
import { createHash, validatePassword } from '../../utils/bcrypt.js'
import { generateToken } from '../../utils/jwt.js'

// Passport it will be handled as if it were a middleware 
const LocalStrategy = local.Strategy //Estretagia local de autenticacion

// Route to implement
export const strategyRegister = new LocalStrategy({
    passReqToCallback: true, 
    usernameField: 'email'
  }, async (req, username, password, done) => {
    // Validate and create user
    const { first_name, last_name, email } = req.body
    try {
      const user = await findUserByEmail(username) // Username = email

      if (user) { // User already exist
        return done(null, false, "user already exists") // null that there were no errors || false that the user was not created
      }
      const passwordHash = createHash(password)
      const idCart = await createCart()
      
      const userCreated = await createUser({
        first_name: first_name,
        last_name: last_name,        
        email: email,
        password: passwordHash, 
        idCart: idCart.id
      })      
      
      const token = generateToken(userCreated)
      console.log("Token: ", token)

      return done(null, userCreated) // User created successfully

    } catch (error) {
      return done(error)
    }
  }
)

export const strategyLogin =  new LocalStrategy({
    usernameField: 'email' 
  }, async (username, password, done) => {
    try {
      const user = await findUserByEmail(username)

      if (!user) { // User not found
        return done(null, false)
      }
      if (validatePassword(password, user.password)) { // Valid user and password
        const token = generateToken(user)
        console.log("TOKEN=", token)
        return done(null, user)
      }
      return done(null, false) // Invalid password

    } catch (error) {
      return done(error)
    }
  }
)