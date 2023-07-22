import passport from "passport"

export const passportMessage = (strategy) => { // Validates with JWT
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) { // Token errors (Invalid Token, Invalid Formant, Dont exists)
        return next(error)
      }

      if (!user) { // User not found
        return res.status(401).send({ error: info.message ? info.message : info.toString() })
      }

      req.user = user // If its ok sets user
      return next()

    })(req, res, next)
  }
}