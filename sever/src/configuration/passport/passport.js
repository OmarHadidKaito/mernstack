import { SECRET } from "../../helper/secret";
import { User } from "../../models/user.model";
import { ExtractJwt, Strategy } from "passport-jwt";



export const config_passport = (passport) => {
    const config = {};
    config.secretOrKey = SECRET
    config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    passport.use(new Strategy(config, function (jwtPayload, cb) {
        return User.findById(jwtPayload._id)
            .then(user => { return cb(null, user) })
            .catch(err => { return cb(err) })
    }))
}