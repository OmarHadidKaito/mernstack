import { config } from 'dotenv'

config()

const SECRET = process.env.JWT_SECRET
const EXPIRATION = process.env.JWT_EXPIRATION

export {
    SECRET,
    EXPIRATION
}