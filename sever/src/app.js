import express from 'express'
import passport from 'passport'

import { config_passport } from "./configuration/passport/passport"
import { logger, urlencoded, json } from './middleware/dev.middleware'
import { ERROR_SEVER, NOT_FOUND_404 } from './middleware/error.middleware'
import cors from "cors"

import router from './routes/v1'

const v1 = router
const app = express()



//-------------Middelwares--------------//

/*const whitelist = ['http://example1.com', 'http://example2.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}*/

app.use(logger(`dev`))
app.use(cors(

))
app.use(json())
app.use(urlencoded({ extended: true }))
//-------------Middelwares-passport--------------//
app.use(passport.initialize())
app.use(passport.session())
config_passport(passport)
//-----------------Routes--------------//
app.use(`/api/v1`, v1)

//-----------------ERRORS--------------//
app.use(NOT_FOUND_404)
app.use(ERROR_SEVER)


export {
    app
}