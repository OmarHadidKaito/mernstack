import { User } from '../models/user.model'
import { UNAUTHORIZED } from 'http-status'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userController = {}

/*
*
*/
userController.register = (req, res, next) => {
    const { name, email, password, joined } = req.body

    const newUser = new User({ name, email, password, joined })

    newUser.save()
        .then((user) => { return res.send({ user }) })
        .catch((e) => {
            let error = new Error(`email ${email} alread used`)
            next(error)
        })
}




userController.login = async (req, res, next) => {
    //email,password in request
    const { email, password } = req.body
    let user = null
    let isValidPassword = false

    try {
        user = await User.findOne({ email }).orFail()
    } catch (error) {
        const err = new Error(`worng email:${email}`)
        err.status = UNAUTHORIZED
        return next(err)
    }

    try {
        isValidPassword = await bcrypt.compare(password, user.password)
    } catch (error) {
        const err = new Error(`wrong password`)
        return next(err)
    }

    const secret = process.env.JWT_SECRET
    const expire = process.env.JWT_EXPIRATION
    //const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: EXPIRATION })
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });

    return isValidPassword ? res.send({ token }) : res.send({ Error: `password or email wrong` })
}

userController.me = (req, res, next) => {
    const { user } = req
    res.send({ user })
}
export default userController