const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
import { dynamicModelWithDBConnection } from "../models/dynamicModel"
import { COLLECTIONS } from "../constant"

const opts: any = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.jwtSecret

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
            const dm = await dynamicModelWithDBConnection("secure-sight", COLLECTIONS.USERS)
            // const dm = await dynamicModelWithDBConnection("orion", COLLECTIONS.USERS)
            const user = await dm.findOne({ email: jwt_payload.email }, { password: 0 }).lean()
            return user ? done(null, user) : done(null, false)
        })
    )
}
