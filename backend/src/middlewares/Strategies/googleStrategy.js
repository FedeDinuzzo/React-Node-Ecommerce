import GoogleStrategy from 'passport-google-oauth20'
import { findUserByEmail, createUser } from '../../services/userService.js'
import { createCart } from '../../services/cartService.js'
import { createHash } from '../../utils/bcrypt.js'
import { generateToken } from '../../utils/jwt.js'
import { env } from "../../config/config.js"


const googleOptions = {
  clientID: env.clientIdGoogle,
  clientSecret: env.clientSecretGoogle,
  callbackURL: 'http://localhost:4000/authGoogle/googleSession',
  scope: ['profile','email'] // scope: access to the email of the authenticated user on GitHub is requested
}

export const strategyGoogle = new GoogleStrategy(googleOptions, async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await findUserByEmail(profile._json.email)
    
    if (user) { // User already exists on db
      const token = generateToken(user)
      console.log("TOKEN=", token)
      return cb(null, user, {token: token})
    } else {
      const passwordHash = createHash('coder123')
      const idCart = await createCart()
      const userCreated = await createUser({
        first_name: profile._json.given_name,
        last_name: profile._json.family_name,
        email: profile.emails[0].value,
        password: passwordHash, // Default password since can't access github password
        idCart: idCart.id
      })
      const token = generateToken(userCreated)
      console.log("TOKEN=", token)

      return cb(null, userCreated, {token: token})
    }
  } catch (error) {
    return cb(error)
  }
})
