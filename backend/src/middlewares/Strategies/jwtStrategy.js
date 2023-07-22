import jwt from 'passport-jwt'
import { env } from "../../config/config.js"

const JWTStrategy = jwt.Strategy // JWT Strategy
const ExtractJWT = jwt.ExtractJwt // Extractor either headers or cookies...

const cookieExtractor = (req) => {
  // If cookies exist, I check if my cookie exists. If neither of the two is fulfilled, I assign null
  const token = req.cookies ? req.cookies.jwtCookies : null
                              // if the specified cookie does not exist, I assign undefined to token
  return token
}

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // From where do i extract my token
  secretOrKey: env.signedCookie  // Same value as cookie signature
}

export const strategyJWT = new JWTStrategy(jwtOptions, async(jwt_payload, done) =>{
  try {
    return done(null, jwt_payload)
  } catch (error) {
    return done(error)
  }      
})
