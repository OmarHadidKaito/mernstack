import passport from 'passport'
import { UNAUTHORIZED } from "http-status";
function authenticate(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = new Error(`you are not authorized to access`)
            error.status = UNAUTHORIZED
            throw error
        }
        req.user = user
        return next()
    })(req, res, next)
}

export default authenticate