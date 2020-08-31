import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    joined: { type: Date, defualt: new Date() }
})

UserSchema.pre(`save`, async function (next) {
    //check new acount or password modeified
    if (!this.isModified(`password`)) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        next()
    } catch (e) {
        return next(e)
    }
})


UserSchema.methods.toJSON = function toJSON() {
    const userObject = this.toObject()
    delete userObject.password
    return userObject
}

export const User = mongoose.model(`User`, UserSchema)

